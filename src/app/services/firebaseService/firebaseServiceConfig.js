const prodConfig = {
	// apiKey           : "YOUR_API_KEY",
	// authDomain       : "your-app.firebaseapp.com",
	// databaseURL      : "https://your-app.firebaseio.com",
	// projectId        : "your-app",
	// storageBucket    : "your-app.appspot.com",
	// messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
	// apiKey: "AIzaSyCLVhD5MkWZnSb-_MWjQoiHYd_twHtKB8M",
    // authDomain: "tweetking-604eb.firebaseapp.com",
    // databaseURL: "https://tweetking-604eb.firebaseio.com",
    // projectId: "tweetking-604eb",
    // storageBucket: "tweetking-604eb.appspot.com",
    // messagingSenderId: "109006592562",
    // appId: "1:109006592562:web:6cd9e2d361025586463a2b",
    // measurementId: "G-4Y31B57NFQ"

    // apiKey: process.env.apiKey,
    // authDomain: process.env.authDomain,
    // databaseURL: process.env.databaseURL,
    // projectId: process.env.projectId,
    // storageBucket: process.env.storageBucket,
    // messagingSenderId:process.env.messagingSenderId,
    // appId: process.env.appId,
    // measurementId: process.env.measurementId

    apiKey: "AIzaSyDXsgfYrunCnjJAU6kNfrGRiqCQ3KD65Sg",
    authDomain: "publicity-bandit.firebaseapp.com",
    databaseURL: "https://publicity-bandit.firebaseio.com",
    projectId: "publicity-bandit",
    storageBucket: "publicity-bandit.appspot.com",
    messagingSenderId: "124724713249",
    appId: "1:124724713249:web:2a05085d28645a133c5060",
    measurementId: "G-25DWW47PX9"


};

const devConfig = {
	// apiKey           : "YOUR_API_KEY",
	// authDomain       : "your-app.firebaseapp.com",
	// databaseURL      : "https://your-app.firebaseio.com",
	// projectId        : "your-app",
	// storageBucket    : "your-app.appspot.com",
	// messagingSenderId: "YOUR_MESSAGING_SENDER_ID"

	// apiKey: "AIzaSyCLVhD5MkWZnSb-_MWjQoiHYd_twHtKB8M",
    // authDomain: "tweetking-604eb.firebaseapp.com",
    // databaseURL: "https://tweetking-604eb.firebaseio.com",
    // projectId: "tweetking-604eb",
    // storageBucket: "tweetking-604eb.appspot.com",
    // messagingSenderId: "109006592562",
    // appId: "1:109006592562:web:6cd9e2d361025586463a2b",
    // measurementId: "G-4Y31B57NFQ"


    // apiKey: process.env.apiKey,
    // authDomain: process.env.authDomain,
    // databaseURL: process.env.databaseURL,
    // projectId: process.env.projectId,
    // storageBucket: process.env.storageBucket,
    // messagingSenderId:process.env.messagingSenderId,
    // appId: process.env.appId,
    // measurementId: process.env.measurementId
    apiKey: "AIzaSyDXsgfYrunCnjJAU6kNfrGRiqCQ3KD65Sg",
    authDomain: "publicity-bandit.firebaseapp.com",
    databaseURL: "https://publicity-bandit.firebaseio.com",
    projectId: "publicity-bandit",
    storageBucket: "publicity-bandit.appspot.com",
    messagingSenderId: "124724713249",
    appId: "1:124724713249:web:2a05085d28645a133c5060",
    measurementId: "G-25DWW47PX9"




};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
