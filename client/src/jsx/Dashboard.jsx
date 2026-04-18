import React, { useEffect, useState } from 'react';
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
	}, []);

	const fetchData = () => {
		const currentUser = localStorage.getItem('currentUser');
		const params = currentUser ? { Username: currentUser } : {};
		axios
			.get('/loadDashboard', { params })
			.then((response) => {
				console.log(response);

				setName(response.data?.result?.Name || 'Unknown');
				setEmail(response.data?.result?.Username || 'Unknown');

				if (response.data?.WeatherData) {
					setLocation(response.data.WeatherData.Location || 'Unknown Location');
					setCloud(response.data.WeatherData.Cloud || 0);
					
					setTempUnit(u => {
						let t = response.data.WeatherData.Temp || 0;
						setTemp(u === 'F' ? ((t * 9 / 5) + 32).toFixed(1) : t);
						return u;
					});
					
					setFeelsLikeUnit(u => {
						let fl = response.data.WeatherData.FeelsLike || 0;
						setFeelsLike(u === 'F' ? ((fl * 9 / 5) + 32).toFixed(1) : fl);
						return u;
					});

					setGustUnit(u => {
						let g = response.data.WeatherData.Gust || 0;
						setGust(u === 'kph' ? (g * 1.60934).toFixed(1) : g);
						return u;
					});

					setLatitude(response.data.WeatherData.Latitude || 0);
					setLongitude(response.data.WeatherData.Longitude || 0);

					setPressureUnit(u => {
						let p = response.data.WeatherData.Pressure || 0;
						setPressure(u === 'in' ? (p * 0.03937).toFixed(1) : p);
						return u;
					});

					setVisibilityUnit(u => {
						let v = response.data.WeatherData.Visibility || 0;
						setVisibility(u === 'mile' ? (v * 0.62137119).toFixed(1) : v);
						return u;
					});

					setWindUnit(u => {
						let w = response.data.WeatherData.Wind || 0;
						setWind(u === 'kph' ? (w * 1.60934).toFixed(1) : w);
						return u;
					});
					setWindDeg(response.data.WeatherData.WindDeg || 0);
					setWindDir(response.data.WeatherData.WindDir || 'N/A');
					setUVIndex(response.data.WeatherData.UV || 0);
					setTime(response.data.WeatherData.Time || 0);
					setHumidity(response.data.WeatherData.Humidity || 0);
				} else {
					setLocation('Location Not Found (Invalid City)');
				}
			})
			.catch((error) => {
				console.error(error);
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
			setPressureUnit('in');
			setPressure((Pressure * 0.03937).toFixed(1));
		} else {
			setPressureUnit('mb');
			setPressure((Pressure / 0.03937).toFixed(1));
		}
	}

	function VisibilityChange() {
		if (VisibilityUnit === 'km') {
			setVisibilityUnit('mile');
			setVisibility((Visibility * 0.62137119).toFixed(1));
		} else {
			setVisibilityUnit('km');
			setVisibility((Visibility / 0.62137119).toFixed(1));
		}
	}

	function GustChange() {
		if (GustUnit === 'mph') {
			setGustUnit('kph');
			setGust((Gust * 1.60934).toFixed(1));
		} else {
			setGustUnit('mph');
			setGust((Gust / 1.60934).toFixed(1));
		}
	}

	function WindChange() {
		if (WindUnit === 'mph') {
			setWindUnit('kph');
			setWind((Wind * 1.60934).toFixed(1));
		} else {
			setWindUnit('mph');
			setWind((Wind / 1.60934).toFixed(1));
		}
	}

	function changeTempUnit() {
		if (TempUnit === 'C') {
			setTempUnit('F');
			setFeelsLikeUnit('F');
			setTemp(((Temp * 9) / 5 + 32).toFixed(1));
			setFeelsLike(((FeelsLike * 9) / 5 + 32).toFixed(1));
		} else {
			setTempUnit('C');
			setFeelsLikeUnit('C');
			setTemp((((Temp - 32) * 5) / 9).toFixed(1));
			setFeelsLike((((FeelsLike - 32) * 5) / 9).toFixed(1));
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
