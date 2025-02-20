import { useState } from 'react';

export default function InfoPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mui-paper p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h2 className="text-xl font-medium text-gray-800">
          About CORS & Same-Origin Policy
        </h2>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      <div className={`mt-4 space-y-4 overflow-hidden transition-all duration-200 ${
        isOpen ? 'max-h-[1000px]' : 'max-h-0'
      }`}>
        <section>
          <h3 className="font-medium text-lg text-gray-800 mb-2">Same-Origin Policy (SOP)</h3>
          <p className="text-gray-600">
            Same-Origin Policy is a critical security mechanism that restricts how a document or script loaded from one origin 
            can interact with resources from other origins. An origin is defined by the combination of protocol, domain, and port.
          </p>
          <div className="mt-2 bg-gray-50 p-3 rounded-md text-sm">
            <p className="font-medium">Example Origin: https://example.com:443</p>
            <ul className="mt-1 space-y-1 text-gray-600">
              <li>• Protocol: https://</li>
              <li>• Domain: example.com</li>
              <li>• Port: 443</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="font-medium text-lg text-gray-800 mb-2">Cross-Origin Resource Sharing (CORS)</h3>
          <p className="text-gray-600">
            CORS is a mechanism that allows restricted resources on a web page to be accessed from another domain outside 
            the domain from which the first resource was served. CORS relaxes the Same-Origin Policy.
          </p>
        </section>

        <section>
          <h3 className="font-medium text-lg text-gray-800 mb-2">Test Types Explained</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-800">XHR/Fetch Requests</h4>
              <p className="text-gray-600 text-sm">
                • Strictly controlled by CORS<br />
                • Requires appropriate CORS headers from the server<br />
                • Common headers: Access-Control-Allow-Origin, Access-Control-Allow-Methods
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Image Loading</h4>
              <p className="text-gray-600 text-sm">
                • Generally allowed across origins<br />
                • Cannot access pixel data of cross-origin images via canvas<br />
                • Useful for img tags, favicons, etc.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Iframe Access</h4>
              <p className="text-gray-600 text-sm">
                • Controlled by Same-Origin Policy<br />
                • Cannot access content of cross-origin iframes<br />
                • Can be modified using document.domain or postMessage
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 