import { LaunchBrowserTask } from '@/lib/workflow/task/LaunchBrowser';
import { ExecutionEnvironment } from '@/types/executor';
import puppeteer from 'puppeteer';

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>,
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput('Website Url');
    const browser = await puppeteer.launch({
      headless: true, // for testing
      args: ['--proxy-server=brd.superproxy.io:33335'],
    });
    environment.log.info('Browser started successfully');
    environment.setBrowser(browser);
    const page = await browser.newPage();
    page.setViewport({ width: 2560, height: 1440 });
    await page.authenticate({
      username: process.env.NEXT_PUBLIC_BRIGHTDATA_USERNAME!,
      password: process.env.NEXT_PUBLIC_BRIGHTDATA_PASSWORD!,
    });
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
