const { chromium } = require('playwright');

async function runSystemCheck() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const bugs = [];
  const logError = (msg) => {
    console.error(`[BUG FOUND]: ${msg}`);
    bugs.push(msg);
  };

  // Слушатель консоли
  page.on('console', msg => {
    if (msg.type() === 'error') {
      logError(`Browser Console Error: ${msg.text()} at ${page.url()}`);
    }
  });

  console.log('--- Начинаю глубокий системный аудит ---');

  try {
    const routes = ['/', '/privacy', '/requisites', '/oferta', '/not-found-test'];

    for (const route of routes) {
      console.log(`Checking route: ${route}`);
      const response = await page.goto(`http://localhost:3000${route}`);

      // Проверка 404 (кроме теста самой 404)
      if (route !== '/not-found-test' && response.status() === 404) {
        logError(`Unexpected 404 error on route ${route}`);
      }

      // Проверка кастомной 404 страницы
      if (route === '/not-found-test') {
        const content = await page.textContent('body');
        if (!content.includes('404') && !content.includes('Сбой маршрутизации')) {
          logError('Custom 404 page is not working or showing wrong content');
        } else {
          console.log('   Custom 404 page: OK');
        }
      }

      await page.waitForTimeout(1000);
    }

    // Тестирование Форм на главной
    console.log('Checking Contact Form validation...');
    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(2000); // Splash screen

    // Устранение помехи: Принимаем Cookie
    console.log('   Waiting for cookie banner...');
    try {
      const cookieBtn = page.locator('button:has-text("Принять все")');
      await cookieBtn.waitFor({ state: 'visible', timeout: 5000 });
      await cookieBtn.click();
      console.log('   Cookie banner dismissed.');
      await page.waitForTimeout(1000); // Ждем завершения анимации исчезновения
    } catch (e) {
      console.log('   Cookie banner not found or already dismissed.');
    }

    // Скролл к форме
    await page.evaluate(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView();
    });
    await page.waitForTimeout(500);

    // Попытка отправить форму (используем force: true на случай перекрытий)
    await page.click('button[type="submit"]', { force: true });
    console.log('   Submit button clicked.');
    await page.waitForTimeout(1000);

    const nameError = await page.isVisible('text=ERROR: MISSING_NAME');
    if (!nameError) logError('Contact Form: Name validation error not displayed for empty field');

    const consentError = await page.isVisible('text=ACTION_REJECTED: ACCEPT_TERMS_TO_PROCEED');
    if (!consentError) logError('Contact Form: Consent validation error not displayed');

    // Тестирование навигации
    console.log('Checking Navigation Links...');
    const navLinks = await page.locator('nav a[href^="#"]').all();
    if (navLinks.length === 0) {
      logError('Navigation: No anchor links found in navbar');
    } else {
      console.log(`   Found ${navLinks.length} nav links. Testing first one...`);
      await navLinks[0].click();
      const url = page.url();
      if (!url.includes('#')) logError(`Navigation: Click on ${await navLinks[0].textContent()} did not update URL hash`);
    }

  } catch (error) {
    logError(`Script execution failed: ${error.message}`);
  } finally {
    await browser.close();

    if (bugs.length > 0) {
      console.log(`\n--- Аудит завершен. Найдено багов: ${bugs.length} ---`);
      // Выводим в формате JSON для Claude
      console.log('REPORT_START');
      console.log(JSON.stringify(bugs));
      console.log('REPORT_END');
    } else {
      console.log('\n--- Аудит завершен. Ошибок не обнаружено. ---');
    }
  }
}

runSystemCheck();
