import React, { useEffect, useState, useRef } from 'react';
import "../css/dashboard.css";
import axios from 'axios';
import WindGraph from './Radialbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
	const [Name, setName] = useState('admin');
	const [Email, setEmail] = useState('admin@weathersense.com');
	const [Location, setLocation] = useState('AdminLocation');
	const [Temp, setTemp] = useState(20);
	const [TempUnit, setTempUnit] = useState('C');
	const [Cloud, setCloud] = useState(0);
	const [Time, setTime] = useState(20);
	const [FeelsLike, setFeelsLike] = useState(20);
	const [FeelsLikeUnit, setFeelsLikeUnit] = useState('C');
	const [Visibility, setVisibility] = useState(70);
	const [UVIndex, setUVIndex] = useState(5);
	const [Longitude, setLongitude] = useState(83.4);
	const [Latitude, setLatitude] = useState(18.11);
	const [Pressure, setPressure] = useState(5);
	const [PressureUnit, setPressureUnit] = useState('mb');
	const [VisibilityUnit, setVisibilityUnit] = useState('km');
	const [Gust, setGust] = useState(6);
	const [GustUnit, setGustUnit] = useState('mph');
	const [WindUnit, setWindUnit] = useState('mph');
	const [Wind, setWind] = useState(0);
	const [WindDeg, setWindDeg] = useState(270);
	const [WindDir, setWindDir] = useState('N');
	const [Humidity, setHumidity] = useState(0);
	const [DisplayTime, setDisplayTime] = useState('');

	// Refs to always read current unit value synchronously inside async fetchData
	const tempUnitRef = useRef('C');
	const feelsLikeUnitRef = useRef('C');
	const windUnitRef = useRef('mph');
	const gustUnitRef = useRef('mph');
	const pressureUnitRef = useRef('mb');
	const visibilityUnitRef = useRef('km');


	useEffect(() => {
		fetchData();
		const interval = setInterval(fetchData, 60000);
		// Clock ticks every second — stored in DisplayTime, separate from API Time
		const timeInterval = setInterval(() => {
			setDisplayTime(getCurrentTime());
		}, 1000);
		setDisplayTime(getCurrentTime()); // set immediately on mount

		return () => {
			clearInterval(interval);
			clearInterval(timeInterval);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchData = () => {
		const currentUser = localStorage.getItem('currentUser');
		const params = currentUser ? { Username: currentUser } : {};
		axios
			.get('/loadDashboard', { params })
			.then((response) => {
				const d = response.data;
				const wd = d?.WeatherData;

				// User details
				setName(d?.result?.Name ?? 'Unknown');
				setEmail(d?.result?.Username ?? 'Unknown');

				if (!wd) {
					setLocation('Location Not Found (Invalid City)');
					return;
				}

				// Location
				setLocation(wd.Location ?? 'Unknown Location');

				// Cloud cover (0-100 integer, valid at 0)
				setCloud(wd.Cloud ?? 0);

				// Temperature — convert from Celsius based on current selected unit
				const rawTemp = wd.Temp ?? 0;
				setTemp(tempUnitRef.current === 'F' ? +((rawTemp * 9 / 5) + 32).toFixed(1) : rawTemp);

				// Feels like — same conversion
				const rawFeels = wd.FeelsLike ?? 0;
				setFeelsLike(feelsLikeUnitRef.current === 'F' ? +((rawFeels * 9 / 5) + 32).toFixed(1) : rawFeels);

				// Gust — convert from mph based on current selected unit
				const rawGust = wd.Gust ?? 0;
				setGust(gustUnitRef.current === 'kph' ? +(rawGust * 1.60934).toFixed(1) : rawGust);

				// Coordinates
				setLatitude(wd.Latitude ?? 0);
				setLongitude(wd.Longitude ?? 0);

				// Pressure — convert from mb based on current selected unit
				const rawPressure = wd.Pressure ?? 0;
				setPressure(pressureUnitRef.current === 'in' ? +(rawPressure * 0.03937).toFixed(1) : rawPressure);

				// Visibility — convert from km based on current selected unit
				const rawVis = wd.Visibility ?? 0;
				setVisibility(visibilityUnitRef.current === 'mile' ? +(rawVis * 0.62137119).toFixed(1) : rawVis);

				// Wind speed — convert from mph based on current selected unit
				const rawWind = wd.Wind ?? 0;
				setWind(windUnitRef.current === 'kph' ? +(rawWind * 1.60934).toFixed(1) : rawWind);

				// Wind direction
				setWindDeg(wd.WindDeg ?? 0);
				setWindDir(wd.WindDir ?? 'N/A');

				// UV Index (0-11 scale)
				setUVIndex(wd.UV ?? 0);

				// Location local time from API
				setTime(wd.Time ?? '');

				// Humidity (0-100 integer %)
				setHumidity(wd.Humidity ?? 0);
			})
			.catch((error) => {
				console.error('Dashboard fetch error:', error);
			});
	};

	const currentTime = new Date();
	const currentHour = String(currentTime.getHours()).padStart(2, '0');
	const currentMinute = String(currentTime.getMinutes()).padStart(2, '0');
	const currentSecond = String(currentTime.getSeconds()).padStart(2, '0');

	function getCurrentTime() {
		const t = new Date();
		const h = String(t.getHours()).padStart(2, '0');
		const m = String(t.getMinutes()).padStart(2, '0');
		const s = String(t.getSeconds()).padStart(2, '0');
		return `${h}:${m}:${s}`;
	}

	function PressureChange() {
		if (PressureUnit === 'mb') {
			pressureUnitRef.current = 'in';
			setPressureUnit('in');
			setPressure(+(Pressure * 0.03937).toFixed(1));
		} else {
			pressureUnitRef.current = 'mb';
			setPressureUnit('mb');
			setPressure(+(Pressure / 0.03937).toFixed(1));
		}
	}

	function VisibilityChange() {
		if (VisibilityUnit === 'km') {
			visibilityUnitRef.current = 'mile';
			setVisibilityUnit('mile');
			setVisibility(+(Visibility * 0.62137119).toFixed(1));
		} else {
			visibilityUnitRef.current = 'km';
			setVisibilityUnit('km');
			setVisibility(+(Visibility / 0.62137119).toFixed(1));
		}
	}

	function GustChange() {
		if (GustUnit === 'mph') {
			gustUnitRef.current = 'kph';
			setGustUnit('kph');
			setGust(+(Gust * 1.60934).toFixed(1));
		} else {
			gustUnitRef.current = 'mph';
			setGustUnit('mph');
			setGust(+(Gust / 1.60934).toFixed(1));
		}
	}

	function WindChange() {
		if (WindUnit === 'mph') {
			windUnitRef.current = 'kph';
			setWindUnit('kph');
			setWind(+(Wind * 1.60934).toFixed(1));
		} else {
			windUnitRef.current = 'mph';
			setWindUnit('mph');
			setWind(+(Wind / 1.60934).toFixed(1));
		}
	}

	function changeTempUnit() {
		if (TempUnit === 'C') {
			tempUnitRef.current = 'F';
			feelsLikeUnitRef.current = 'F';
			setTempUnit('F');
			setFeelsLikeUnit('F');
			setTemp(+((Temp * 9) / 5 + 32).toFixed(1));
			setFeelsLike(+((FeelsLike * 9) / 5 + 32).toFixed(1));
		} else {
			tempUnitRef.current = 'C';
			feelsLikeUnitRef.current = 'C';
			setTempUnit('C');
			setFeelsLikeUnit('C');
			setTemp(+(((Temp - 32) * 5) / 9).toFixed(1));
			setFeelsLike(+(((FeelsLike - 32) * 5) / 9).toFixed(1));
		}
	}

	return (
		<>
			<div className="dash-background">
				<div className="dash-section">
					<div className="dash-left-section">
						<div className="Time-Section">
							<div className="Time">
								<FontAwesomeIcon icon={faClock} size="xl" style={{ color: 'White' }} />
								{` ${DisplayTime}`}
							</div>
							<div className="Location">{Location}</div>
							<br></br>
							<div className="Latitude">{`Latitiude: ${Latitude}`}</div>
							<div className="Longitude">{`Longitude: ${Longitude}`}</div>
							<div className="Temperature" onClick={changeTempUnit}>
								<div className="tempVal">{`${Temp}°`}</div>
								<div className="tempUnit"> {TempUnit}</div>
							</div>
							<div className="feels-like">{`Feels like ${FeelsLike}°${FeelsLikeUnit}`}</div>
						</div>
						<div className="Other-Weather-Section">
							<div className="Pressure">
								<div>Pressure </div>
								<div className="unit" id="pUnit" onClick={PressureChange}>
									{PressureUnit}
								</div>
								<div id="pressVal">{Pressure} </div>
							</div>
							<div className="Visibility">
								<div>Visibility</div>
								<div className="unit" id="visUnit" onClick={VisibilityChange}>
									{VisibilityUnit}
								</div>
								<div id="visVal">{Visibility} </div>
							</div>
							<div className="Gust">
								<div>WindGust</div>
								<div className="unit" id="gustUnit" onClick={GustChange}>
									{GustUnit}
								</div>
								<div id="gustVal">{Gust} </div>
							</div>
						</div>
					</div>
					<div className="dash-right-section">
						<div className="dash-right-content">
							<div className="daily-right-top-section">
								<div className="UserDetails">
									Hi {Name}, logged in as {Email}
								</div>
								<div className="Wind" onClick={WindChange}>
									Wind: {Wind} {WindUnit} @ {WindDeg}°{WindDir}
								</div>
								<div className="VisibNuvIndex-name">
									<div className="Cloud">Chances of Cloud</div>
									<div className="UV"> UV Index <br />(1 - 11)</div>
								</div>
							</div>
							<div className="dash-right-bottom-section">
								<div className="thermom-section-left">
									<div className="thermom" style={{ height: `${Cloud}%` }}></div>
								</div>
								<div className="WindGraph">
									<WindGraph val1={Humidity} />
								</div>
								<div className="thermom-section-right">
									<div className="thermom" style={{ height: `${UVIndex / 0.11}%` }}></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
