import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faClock, faUmbrella } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const WeatherDivForADay = () => (
  <div className="">
    <h1 className="text-4xl">10°</h1>
    <div className="text-sm py-2">Clear</div>
    <div className="text-sm">
      <FontAwesomeIcon icon={faUmbrella} />: 1%
    </div>
    <h1 className="text-xs py-8 flex flex-col gap-2 items-center">
      <p>
        <FontAwesomeIcon icon={faClock} /> 00:00
      </p>
      <p>Today</p>
    </h1>
  </div>
);

export const WeatherDivForAWeek = () => (
  <div className="">
    <h1 className="text-4xl">10°</h1>
    <div className="text-sm py-2">Clear</div>
    <div className="text-sm">
      <FontAwesomeIcon icon={faUmbrella} />: 1%
    </div>
    <h1 className="text-xs py-12">12/01/20</h1>
  </div>
);

export const WeatherDetailsDay = ({
  icon,
  text,
}: {
  icon: IconProp;
  text: string;
}) => (
  <p className="flex items-center gap-4 text-sm">
    <FontAwesomeIcon icon={icon} size="1x" className="w-4" />
    {text}
  </p>
);
