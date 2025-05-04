import { useState } from 'react';
import { FileUp, FileDown, Upload, Database } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const ImportExport = () => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== 'text/csv') {
        setErrorMessage('Please upload a CSV file');
        setUploadFile(null);
        return;
      }
      setUploadFile(file);
      setErrorMessage('');
    }
  };

  const handleUpload = () => {
    if (!uploadFile) {
      setErrorMessage('Please select a file to upload');
      return;
    }

    setUploadStatus('loading');
    
    // In a real app, we would implement the actual upload logic
    setTimeout(() => {
      setUploadStatus('success');
      // Reset after a few seconds
      setTimeout(() => {
        setUploadStatus('idle');
        setUploadFile(null);
      }, 3000);
    }, 1500);
  };

  const handleExportPlayers = () => {
    // In a real app, we would implement CSV export functionality
    alert('Export Players CSV functionality would go here');
  };

  const handleExportMatches = () => {
    // In a real app, we would implement CSV export functionality
    alert('Export Matches CSV functionality would go here');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Import / Export
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your cricket data with bulk import and export options
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Import Section */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
              <FileUp size={20} className="mr-2" />
              Import Data
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <Upload size={40} className="mx-auto mb-3 text-gray-400 dark:text-gray-500" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Drag and drop a CSV file or click to browse
              </p>
              <div className="relative">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept=".csv"
                />
                <Button variant="outline" fullWidth>
                  Browse Files
                </Button>
              </div>
              {uploadFile && (
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Selected: {uploadFile.name}
                </div>
              )}
              {errorMessage && (
                <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errorMessage}
                </div>
              )}
            </div>
            
            <div>
              <Button
                fullWidth
                onClick={handleUpload}
                disabled={!uploadFile || uploadStatus === 'loading'}
              >
                {uploadStatus === 'loading' ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Uploading...
                  </>
                ) : uploadStatus === 'success' ? (
                  'Upload Successful!'
                ) : (
                  'Upload CSV'
                )}
              </Button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                CSV Format Guidelines
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
                <li>Use the correct column headers (Name, Role, etc.)</li>
                <li>For player data: Name, Photo URL, Role, etc.</li>
                <li>For match data: Date, Ground, Team A, Team B, etc.</li>
                <li>Dates should be in YYYY-MM-DD format</li>
                <li>
                  <a
                    href="#"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    Download CSV templates
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Card>
        
        {/* Export Section */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
              <FileDown size={20} className="mr-2" />
              Export Data
            </h2>
          </div>
          
          <div className="space-y-6">
            {/* Players Export */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Players Data
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Export all player profiles and statistics
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleExportPlayers}>
                  Export CSV
                </Button>
              </div>
            </div>
            
            {/* Matches Export */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Matches Data
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Export all match records and scorecards
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleExportMatches}>
                  Export CSV
                </Button>
              </div>
            </div>
            
            {/* Stats Export */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Performance Stats
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Export aggregated player statistics
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => alert('Export Stats functionality would go here')}>
                  Export CSV
                </Button>
              </div>
            </div>
            
            {/* Filtered Data Export */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                Export Filtered Data
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Start Date"
                    />
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="End Date"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={() => alert('Export Filtered Data functionality would go here')}>
                    Export Filtered Data
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Data Management Section */}
      <Card className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
            <Database size={20} className="mr-2" />
            Data Management
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                  Caution
                </h3>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
                  <p>
                    Importing new data will not delete existing records unless there are duplicate IDs.
                    Always back up your data before performing bulk operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => alert('Backup functionality would go here')}
            >
              Backup All Data
            </Button>
            
            <Button
              variant="danger"
              onClick={() => {
                if (window.confirm('Are you sure? This action cannot be undone!')) {
                  alert('Reset functionality would go here');
                }
              }}
            >
              Reset All Data
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ImportExport;