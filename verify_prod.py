from playwright.sync_api import sync_playwright
import sys

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        print("Navigating to https://vector-landing-roan.vercel.app...")
        try:
            page.goto('https://vector-landing-roan.vercel.app', timeout=30000)
            page.wait_for_load_state('networkidle')
            
            # Check for "Системный сбой" (System Failure) text which indicates ErrorBoundary
            content = page.content()
            if "Системный сбой" in content:
                print("FAILED: ErrorBoundary is still active (System Failure detected)")
                page.screenshot(path='prod_failure.png')
                sys.exit(1)
            
            # Check for common landing page content (e.g., "ВЕКТОР")
            if "ВЕКТОР" in content or "Доставка" in content:
                print("SUCCESS: Landing page loaded correctly.")
            else:
                print("WARNING: Page loaded but 'ВЕКТОР' or 'Доставка' not found. Check screenshot.")
                page.screenshot(path='prod_check.png')
            
            # Check for Logo existence if possible
            # ...
            
        except Exception as e:
            print(f"ERROR: {e}")
            sys.exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    verify()
