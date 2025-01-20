import { LaunchBrowserTask } from '@/lib/workflow/task/LaunchBrowser';
import { ExecutionEnvironment } from '@/types/executor';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

chromium.setHeadlessMode = true;

chromium.setGraphicsMode = false;

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>,
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput('Website Url');
    const browser = await puppeteer.launch({
      args: [...chromium.args],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        `https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar`,
      ),
      headless: chromium.headless,
      timeout: 60_000,
    });
    environment.log.info('Browser started successfully');
    const page = await browser.newPage();
    await page.goto(websiteUrl, { timeout: 60_000 });

    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
