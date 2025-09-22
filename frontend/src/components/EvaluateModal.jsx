import React from 'react';
import { X } from 'lucide-react';

// This is the new modal component for handling evaluations.
function EvaluateModal({ isOpen, onClose, worklets }) {
  // Don't render the modal if it's not open.
  if (!isOpen) return null;

  // Filter the workletsData array to find only those with a "Completed" status.
  const completedWorklets = worklets.filter(w => w.status === 'Completed');

  // Handle the form submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedWorkletId = e.target.elements['worklet-select'].value;
    alert(`Evaluation submitted for Worklet: ${selectedWorkletId}`);
    onClose(); // Close the modal after submission.
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      {/* Modal Content */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Evaluate Worklet</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Dropdown for Completed Worklets */}
          <div className="mb-6">
            <label htmlFor="worklet-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Completed Worklet
            </label>
            <select
              id="worklet-select"
              name="worklet-select"
              className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
            >
              {completedWorklets.length > 0 ? (
                completedWorklets.map(worklet => (
                  <option key={worklet.id} value={worklet.title}>
                    {worklet.title}
                  </option>
                ))
              ) : (
                <option disabled>No completed worklets found</option>
              )}
            </select>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-blue-300 dark:disabled:bg-blue-800"
              disabled={completedWorklets.length === 0}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EvaluateModal;