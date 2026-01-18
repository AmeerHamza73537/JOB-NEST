import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ApplyJob() {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [proposal, setProposal] = useState('');
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!proposal || !resume) {
      alert('Please provide proposal and resume');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('proposal', proposal);
      formData.append('resume', resume);

      const res = await fetch(`/api/listing/apply/${listingId}`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await res.json();
      if (data.success === false) {
        alert('Failed to send application');
      } else {
        alert('Application sent successfully');
      }
    } catch (error) {
      console.log(error);
      alert('Error sending application');
    }
    setSubmitting(false);
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-xl">Something went wrong</p>;

  return (
    <main className="min-h-screen bg-[#F8F9FB] py-10 px-4">
      {listing && (
        <div className="mx-auto max-w-2xl bg-white p-8 rounded-2xl shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Apply for {listing.jobTitle}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="proposal" className="block text-sm font-medium text-gray-700 mb-2">
                Proposal
              </label>
              <textarea
                id="proposal"
                rows={6}
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                placeholder="Write your proposal here..."
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                Resume
              </label>
              <input
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            >
              {submitting ? 'Sending...' : 'Apply'}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
