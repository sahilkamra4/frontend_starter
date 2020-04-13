const prodConfig = {
	// apiKey           : "YOUR_API_KEY",
	// authDomain       : "your-app.firebaseapp.com",
	// databaseURL      : "https://your-app.firebaseio.com",
	// projectId        : "your-app",
	// storageBucket    : "your-app.appspot.com",
	// messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
	apiKey: "AIzaSyCLVhD5MkWZnSb-_MWjQoiHYd_twHtKB8M",
    authDomain: "tweetking-604eb.firebaseapp.com",
    databaseURL: "https://tweetking-604eb.firebaseio.com",
    projectId: "tweetking-604eb",
    storageBucket: "tweetking-604eb.appspot.com",
    messagingSenderId: "109006592562",
    appId: "1:109006592562:web:6cd9e2d361025586463a2b",
    measurementId: "G-4Y31B57NFQ"
};

const devConfig = {
	// apiKey           : "YOUR_API_KEY",
	// authDomain       : "your-app.firebaseapp.com",
	// databaseURL      : "https://your-app.firebaseio.com",
	// projectId        : "your-app",
	// storageBucket    : "your-app.appspot.com",
	// messagingSenderId: "YOUR_MESSAGING_SENDER_ID"

	apiKey: "AIzaSyCLVhD5MkWZnSb-_MWjQoiHYd_twHtKB8M",
    authDomain: "tweetking-604eb.firebaseapp.com",
    databaseURL: "https://tweetking-604eb.firebaseio.com",
    projectId: "tweetking-604eb",
    storageBucket: "tweetking-604eb.appspot.com",
    messagingSenderId: "109006592562",
    appId: "1:109006592562:web:6cd9e2d361025586463a2b",
    measurementId: "G-4Y31B57NFQ"

};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
