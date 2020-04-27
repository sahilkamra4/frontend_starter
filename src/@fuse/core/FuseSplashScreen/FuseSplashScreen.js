import React from 'react';

function FuseSplashScreen() {
	return (
		<div id="fuse-splash-screen" >
			<div className="center" >
				<div className="logo" >
					<img  src="assets/images/logos/premiumlogo (1)/logo_2.svg" alt="logo" />
				</div>
				<div className="spinner-wrapper">
					<div className="spinner" >
						<div className="inner">
							<div className="gap" />
							<div className="left" >
								<div className="half-circle"style={{color:"#5fd0a5"}} />
							</div>
							<div className="right">
								<div className="half-circle" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default React.memo(FuseSplashScreen);
