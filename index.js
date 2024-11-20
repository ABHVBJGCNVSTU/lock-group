const puppeteer = require("puppeteer");

(async () => {
  try {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({
      headless: true, // براوزر کو بغیر انٹرفیس کے لانچ کریں
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // ریپلیٹ یا کوڈ اسپیسز پر چلانے کے لیے ضروری ہے
    });

    const page = await browser.newPage();

    // لاگ ان ڈیٹا (config.json سے یا یہاں ہارڈ کوڈ کریں)
    const email = "miaanamir586@gmail.com";
    const password = "mian222#@";
    const groupUrl = "https://www.facebook.com/messages/t/8431564663563675/";

    console.log("Navigating to Facebook login...");
    await page.goto("https://www.facebook.com/login");

    // Facebook پر لاگ ان کریں
    await page.type('input[name="email"]', email, { delay: 50 });
    await page.type('input[name="pass"]', password, { delay: 50 });
    await page.click('button[name="login"]');

    // لاگ ان کے بعد انتظار کریں
    console.log("Waiting for navigation after login...");
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // گروپ کے صفحے پر جائیں
    console.log("Navigating to the group...");
    await page.goto(groupUrl);

    // گروپ سیٹنگز کھولیں
    console.log("Opening group settings...");
    await page.waitForSelector('span:contains("Edit Group Settings")');
    await page.click('span:contains("Edit Group Settings")');

    // گروپ کا نام لاک کریں
    console.log("Locking group name...");
    await page.waitForSelector('input[name="groupName"]');
    await page.focus('input[name="groupName"]');
    await page.keyboard.type("New Locked Group Name");
    await page.keyboard.press("Enter");

    console.log("Group name updated successfully!");
    await browser.close();
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
})();
