import { useState } from 'react';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default function DeployForm() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [showResult, setShowResult] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!owner || !repo) return;
    setShowResult(true);
  }

  // Get current domain (client-side only)
  const domain = typeof window !== 'undefined' ? window.location.origin : '';
  const imagePath = owner && repo ? `/${owner}/${repo}` : '';
  const imageUrl = domain + imagePath;
  const deployUrl =
    owner && repo
      ? `https://app.netlify.com/start/deploy?repository=https://github.com/${owner}/${repo}`
      : '';
  const htmlCode = `<a href=\"${deployUrl}\"><img src=\"${imageUrl}\" alt=\"Deploy to Netlify\" /></a>`;
  const mdCode = `[![Deploy to Netlify](${imageUrl})](${deployUrl})`;

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="owner" className="block text-sm font-medium text-gray-700">
              Repository Owner
            </label>
            <input
              type="text"
              id="owner"
              name="owner"
              required
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="seancdavis"
            />
          </div>

          <div>
            <label htmlFor="repo" className="block text-sm font-medium text-gray-700">
              Repository Name
            </label>
            <input
              type="text"
              id="repo"
              name="repo"
              required
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="seancdavis-com"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Generate Button
        </button>
      </form>

      {showResult && owner && repo && (
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Deploy to Netlify URL</h3>
            <a href={deployUrl} className="text-blue-600 underline break-all">
              {deployUrl}
            </a>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Image URL</h3>
            <a href={imageUrl} className="text-blue-600 underline break-all">
              {imageUrl}
            </a>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              HTML Code <CopyButton text={htmlCode} />
            </h3>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-sm">
              <code>{htmlCode}</code>
            </pre>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              Markdown Code <CopyButton text={mdCode} />
            </h3>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-sm">
              <code>{mdCode}</code>
            </pre>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Preview</h3>
            <a href={deployUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={imageUrl}
                alt="Deploy to Netlify"
                className="max-w-xs border rounded shadow"
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
