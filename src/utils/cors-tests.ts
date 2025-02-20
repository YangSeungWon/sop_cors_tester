import { TestResult } from "@/types/cors";

export async function testXHR(url: string): Promise<TestResult> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "text/html" },
    });

    const headerEntries = Array.from(response.headers.entries());
    const details = `Status: ${response.status}\nHeaders:\n${headerEntries
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")}`;

    return {
      success: response.ok,
      message: response.ok
        ? "XHR request successful"
        : `Failed with status ${response.status}`,
      details,
      content: response.ok ? await response.text() : undefined,
    };
  } catch (error) {
    return {
      success: false,
      message: `XHR request failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}

export function testImage(url: string): Promise<TestResult> {
  return new Promise((resolve) => {
    const img = new Image();
    const startTime = Date.now();

    img.onload = () => {
      const loadTime = Date.now() - startTime;
      resolve({
        success: true,
        message: "Image loaded successfully",
        details: `Size: ${img.width}x${img.height}px\nLoad time: ${loadTime}ms`,
        content: url,
      });
    };

    img.onerror = () => {
      resolve({
        success: false,
        message: "Image failed to load",
        details:
          "The image could not be loaded, possibly due to CORS restrictions or 404",
      });
    };

    img.src = url;
  });
}

export function testIframe(url: string): Promise<TestResult> {
  return new Promise((resolve) => {
    try {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      iframe.onload = () => {
        try {
          const iframeDoc = iframe.contentWindow?.document;
          const content = iframeDoc?.body?.textContent || "";
          const title = iframeDoc?.title || "";

          resolve({
            success: true,
            message: "Iframe content is accessible",
            details: `Successfully accessed iframe content:
Origin: ${new URL(url).origin}
Title: ${title}
First 100 chars of content: ${content.slice(0, 100)}...`,
            content: url,
          });
        } catch (error) {
          resolve({
            success: false,
            message: "Cannot access iframe content",
            details: `Error: ${
              error instanceof Error ? error.message : "Unknown error"
            }
This is normal for cross-origin iframes due to Same-Origin Policy.
Target Origin: ${new URL(url).origin}
Current Origin: ${window.location.origin}`,
            content: url,
          });
        } finally {
          document.body.removeChild(iframe);
        }
      };

      iframe.src = url;
    } catch (error) {
      resolve({
        success: false,
        message: "Failed to create iframe",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
}

// ... 다른 테스트 함수들 (testImage, testIframe)
