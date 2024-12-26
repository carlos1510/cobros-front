;
import PropTypes from "prop-types";
function StatisticsCard({ color, icon, title, value }){
    return (
        <div className={`relative flex flex-col bg-clip-border rounded-xl bg-${color} text-gray-700 border border-blue-100 shadow-sm`}>
            <div className="bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 absolute grid h-12 w-12 place-items-center">
                {icon}
            </div>
            <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{title}</p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{value}</h4>
            </div>
            {/* <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                    <strong className="text-green-500">{value}</strong> than last week
                </p>
            </div> */}
            
        </div>
    );
}

StatisticsCard.defaultProps = {
    color: "blue",
    footer: null,
  };

  StatisticsCard.propTypes = {
    color: PropTypes.oneOf([
      "white",
      "blue-gray",
      "gray",
      "brown",
      "deep-orange",
      "orange",
      "amber",
      "yellow",
      "lime",
      "light-green",
      "green",
      "teal",
      "cyan",
      "light-blue",
      "blue",
      "indigo",
      "deep-purple",
      "purple",
      "pink",
      "red",
    ]),
    icon: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
    value: PropTypes.node.isRequired,
    footer: PropTypes.node,
  };

  StatisticsCard.displayName = "/src/components/widgets/cards/statistics-card.tsx";

export default StatisticsCard;