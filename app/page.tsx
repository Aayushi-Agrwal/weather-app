import Image from "next/image";
import { faTemperatureLow } from "@fortawesome/free-solid-svg-icons";
import { faTemperatureHigh } from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import {
  faDroplet,
  faWind,
  faEye,
  faGauge,
  faClock,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between bg-[url(/storm-clouds.png)] bg-no-repeat bg-cover text-white">
      <div className="border-r-2 border-x-slate-400 w-1/6 h-screen flex flex-col px-2 items-center justify-around py-12">
        <div className="flex gap-2">
          <h1 className="text-6xl">
            20 <p className="text-sm">Feels like: 20</p>
          </h1>
          <div className="py-1">
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faTemperatureHigh} size="1x" />
              <h3 className="">23</h3>
            </div>

            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faTemperatureLow} size="1x" />
              <h3 className="">18</h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-4 text-sm">
            <FontAwesomeIcon icon={faDroplet} size="1x" className="w-4" />
            Humidity: 23 %
          </p>
          <p className="flex items-center gap-4 text-sm">
            <FontAwesomeIcon icon={faWind} size="1x" className="w-4" />
            Wind: 2.06 at 40 deg
          </p>
          <p className="flex items-center gap-4 text-sm">
            <FontAwesomeIcon icon={faEye} size="1x" className="w-4" />
            Visibility: 6000
          </p>
          <p className="flex items-center gap-4 text-sm">
            <FontAwesomeIcon icon={faGauge} size="1x" className="w-4" />
            Pressure: 1007
          </p>
        </div>
      </div>
      <div className="w-5/6 h-screen px-24 flex flex-col justify-around">
        <div>
          <p>
            <FontAwesomeIcon icon={faMapPin} size="1x" /> Abomsa
          </p>
          {/* name */}
          <h2 className="text-6xl">
            Few Clouds <FontAwesomeIcon icon={faCloud} size="1x" />
          </h2>
          {/* Description */}

          <p className="flex gap-2 items-center py-2 text-sm">
            <FontAwesomeIcon icon={faClock} size="1x" />
            19000
          </p>
        </div>

        <div className="flex gap-8">
          <p className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faSun} size="1x" color="yellow" />
            19000
          </p>

          <p className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faMoon} size="1x" color="grey" />
            19000
          </p>
        </div>
      </div>
    </main>
  );
}
