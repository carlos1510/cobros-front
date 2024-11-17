import * as React from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

interface TransitionContextValue {
  parent: {
      show: boolean;
      appear: boolean;
      isInitialRender: boolean;
  };
}

const TransitionContext = React.createContext<TransitionContextValue>({
    parent: {
      show: false,
      appear: false,
      isInitialRender: true,
    },
});

function useIsInitialRender() {
    const isInitialRender = React.useRef(true);
    React.useEffect(() => {
      isInitialRender.current = false;
    }, [])
    return isInitialRender.current;
}

interface CSSTransitionProps {
    show: boolean;
    enter?: string;
    enterStart?: string;
    enterEnd?: string;
    leave?: string;
    leaveStart?: string;
    leaveEnd?: string;
    appear?: boolean;
    unmountOnExit?: boolean;
    tag?: React.ElementType; // Tipo para el nombre de la etiqueta HTML
    children: React.ReactNode; // Para componentes que renderizan hijos
    [key: string]: unknown; // Para manejar props adicionales como rest
  
}

function CSSTransition({
    show,
    enter = '',
    enterStart = '',
    enterEnd = '',
    leave = '',
    leaveStart = '',
    leaveEnd = '',
    appear,
    unmountOnExit,
    tag = 'div',
    children,
    ...rest
  }: CSSTransitionProps) {
    const enterClasses = enter.split(' ').filter((s) => s.length);
    const enterStartClasses = enterStart.split(' ').filter((s) => s.length);
    const enterEndClasses = enterEnd.split(' ').filter((s) => s.length);
    const leaveClasses = leave.split(' ').filter((s) => s.length);
    const leaveStartClasses = leaveStart.split(' ').filter((s) => s.length);
    const leaveEndClasses = leaveEnd.split(' ').filter((s) => s.length);
    const removeFromDom = unmountOnExit;
  
    function addClasses(node: HTMLElement, classes: string[]) {
      //classes.length && node.classList.add(...classes);
      if (classes.length) node.classList.add(...classes);
    }
  
    function removeClasses(node: HTMLElement, classes: string[]) {
      //classes.length && node.classList.remove(...classes);
      if (classes.length) node.classList.remove(...classes);
    }
  
    const nodeRef = React.useRef(null);
    //const nodeRef = React.useRef<HTMLElement | null>(null);
    const Component = tag;
  
    return (
      <ReactCSSTransition
        appear={appear}
        nodeRef={nodeRef}
        unmountOnExit={removeFromDom}
        in={show}
        addEndListener={(done) => {
          //nodeRef.current.addEventListener('transitionend', done, false)
          if (nodeRef.current) {
            nodeRef.current.addEventListener('transitionend', done, false);
          }
        }}
        onEnter={() => {
          /*if (!removeFromDom) nodeRef.current.style.display = null;
          addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses])*/
          if (!removeFromDom && nodeRef.current) {
            nodeRef.current.style.display = null;
            addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses]);
          }
        }}
        onEntering={() => {
          if (nodeRef.current) {
            removeClasses(nodeRef.current, enterStartClasses);
            addClasses(nodeRef.current, enterEndClasses);
          }
        }}
        onEntered={() => {
          if (nodeRef.current) {
            removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses])
          }
        }}
        onExit={() => {
          if (nodeRef.current) {
            addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses])
          }
        }}
        onExiting={() => {
          if (nodeRef.current) {
            removeClasses(nodeRef.current, leaveStartClasses)
            addClasses(nodeRef.current, leaveEndClasses)
          }
        }}
        onExited={() => {
          if (nodeRef.current) {
            removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses])
            if (!removeFromDom) nodeRef.current.style.display = 'none';
          }
        }}
      >
        <Component ref={nodeRef} {...rest} style={{ display: !removeFromDom ? 'none': undefined }}>{children}</Component>
      </ReactCSSTransition>
    )
}

// Definimos las props de Transition


function Transition({ show, appear, children, ...rest }) {
    const { parent } = React.useContext(TransitionContext);
    const isInitialRender = useIsInitialRender();
    const isChild = show === undefined;

    if (isChild) {
        return (
            <CSSTransition
                appear={parent.appear || !parent.isInitialRender}
                show={parent.show}
                {...rest}
            >
              {children}
            </CSSTransition>
        )
    }

    return (
        <TransitionContext.Provider 
            value={{
                parent: {
                    show,
                    appear,
                    isInitialRender,
                },
            }}
        >
            <CSSTransition appear={appear} show={show} {...rest} >
              {children}
            </CSSTransition>
        </TransitionContext.Provider>
    );
}

export default Transition;