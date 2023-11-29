import { useCountdown } from '../../hooks/useCountdown';
import WebcamVideo from '../../webcam/WebcamVideo';
import { AudioUrl } from '../../utils/constants/audio-url';
import { useUiKaraoke } from '../../hooks/useUiKaraoke';
import { useGetLettersKaraoke } from '../../hooks/useGetLettersKaraoke';
import { lyricsByMusic } from '../../utils/constants/letters-music';
export const TakeVideo = () => {
	const { selectdMusic } = useUiKaraoke();
	const { timeRemaining } = useCountdown(30);

	const { currentLyris, previousLyris } = useGetLettersKaraoke(
		lyricsByMusic[selectdMusic ?? 'bonito']
	);

	return (
		<div>
			<WebcamVideo countDown={timeRemaining} />
			<div
				style={{
					width: '98%',
					height: '200px',
					position: 'absolute',
					overflow: 'hidden',
					bottom: '0%',
					left: '0%',
					backgroundColor: '#000000B3',
					borderRadius: '10px 10px 0px 0px',
					zIndex: 999,
					padding: '10px',
				}}
			>
				{previousLyris !== currentLyris && (
					<p
						key={previousLyris}
						className='animateLyrics'
						style={{
							fontSize: '2rem',
							color: '#FFFFFF',
							fontWeight: 'normal',
							width: '100%',
							textAlign: 'center',
						}}
					>
						{previousLyris}
					</p>
				)}
				<p
					key={currentLyris}
					className='animateLyrics'
					style={{
						fontSize: '3rem',
						color: '#FFFFFF',
						fontWeight: 'bold',
						width: '100%',
						textAlign: 'center',
					}}
				>
					{currentLyris}
				</p>
			</div>
			<img
				src='./assets/images/marco.png'
				alt=''
				style={{ width: '100%', height: '100%', position: 'absolute' }}
			/>
			{selectdMusic && (
				<audio controls={false} autoPlay>
					<source src={AudioUrl[selectdMusic]} type='audio/mp3' />
				</audio>
			)}
		</div>
	);
};
