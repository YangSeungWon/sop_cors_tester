import { TestType, TestCase } from "@/types/cors";

export const TEST_TYPES: TestType[] = [
  {
    id: "xhr",
    name: "XHR/Fetch Request",
    description:
      "Test XMLHttpRequest/Fetch API calls. These are restricted by CORS.",
  },
  {
    id: "image",
    name: "Image Loading",
    description:
      "Test loading images. Images can usually be loaded from any origin.",
  },
  {
    id: "iframe",
    name: "Iframe Access",
    description:
      "Test accessing iframe content. This is restricted by Same-Origin Policy.",
  },
];

export const getDefaultTestCases = (currentOrigin: string): TestCase[] => [
  {
    id: "same-origin",
    name: "Same Origin",
    description: "Test with current origin",
    urls: {
      xhr: `${currentOrigin}`,
      image: `${currentOrigin}/logo_PLUS.png`,
      iframe: `${currentOrigin}/test-frame`,
    },
  },
  {
    id: "cross-origin-no-cors",
    name: "Cross Origin (No CORS)",
    description: "Test with external site without CORS headers",
    urls: {
      xhr: "https://www.google.com",
      image:
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      iframe: "https://www.google.com",
    },
  },
  {
    id: "cross-origin-with-cors",
    name: "Cross Origin (With CORS)",
    description: "Test with API that has CORS enabled",
    urls: {
      xhr: "https://api.ipify.org?format=json",
      image:
        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      iframe: "https://github.com",
    },
  },
];
