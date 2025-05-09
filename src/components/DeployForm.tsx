import { useState } from 'react';

export default function DeployForm() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!owner || !repo) return;
    window.location.href = `/${owner}/${repo}`;
  }

  return (
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
  );
}
