const puppeteer = require('puppeteer');

// console.log("greate pupeteer imported")


 (async () => {
    var fs=require('fs')
    const browser = await puppeteer.launch({headless: false,userDataDir: "./user_data"});
    const page = await browser.newPage();
   
    await page2.goto('https://indianoilswadhyaya.sumtotal.host', {waitUntil: 'networkidle2'});

//    const selector_result= await page.waitForSelector('#BodyContent_MainContent_MainContentPlaceHolder_UserName');
//    const selector_result_2= await page.waitForSelector('#BodyContent_MainContent_MainContentPlaceHolder_Password');
//    const selector_result_3= await page.waitForSelector('#BodyContent_MainContent_MainContentPlaceHolder_LoginButton');
   
//    const username= await page.$eval('#BodyContent_MainContent_MainContentPlaceHolder_UserName', el => el.value = '00512595');
    // await page.focus('#BodyContent_MainContent_MainContentPlaceHolder_UserName');
    // await page.type('#BodyContent_MainContent_MainContentPlaceHolder_UserName', 512595);
//   console.log(username)
//   const pageHtml=await page.content()
//   console.log(pageHtml)
//   fs.writeFile('pagehtm.html', pageHtml, function (err) {
//     if (err) throw err;
//     console.log('Saved!');


//   });




// const password=await page.$eval('#BodyContent_MainContent_MainContentPlaceHolder_Password',el=>el.value='smallOnote'+2+'@')
//   const password=await page.$eval('')
// console.log(password)
//     // await page.pdf({path: 'hn.pdf', format: 'A4'});
// const submit =await page.click('#BodyContent_MainContent_MainContentPlaceHolder_LoginButton')
  
    // await browser.close();
  })();