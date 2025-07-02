"use client";

import { useState, useEffect } from 'react';

interface BlockedIP {
  ip: string;
  attempts: number;
  firstAttempt: string;
  lastAttempt: string;
}

export default function SecurityMonitorClient() {
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSecurityData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/rate-limit-status', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setBlockedIPs(data.blockedIPs);
        setError('');
      } else {
        setError('Failed to fetch security data');
      }
    } catch (err) {
      setError('Failed to fetch security data');
      console.error('Security fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecurityData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchSecurityData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Security Monitor</h1>
            <p className="text-gray-600 mt-2">Monitor failed login attempts and blocked IPs</p>
          </div>
          <button
            onClick={fetchSecurityData}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Blocked IPs</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">{blockedIPs.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Total Attempts</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              {blockedIPs.reduce((sum, ip) => sum + ip.attempts, 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Rate Limiting</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">Active</p>
          </div>
        </div>

        {/* Blocked IPs Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Blocked IP Addresses</h2>
            <p className="text-sm text-gray-600 mt-1">
              IPs are automatically blocked after 5 failed login attempts and unblocked after 15 minutes
            </p>
          </div>

          {loading && !blockedIPs.length ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading security data...</p>
            </div>
          ) : blockedIPs.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-green-500 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No Blocked IPs</h3>
              <p className="text-gray-500 mt-2">All clear! No suspicious login activity detected.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Failed Attempts
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      First Attempt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Attempt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blockedIPs.map((blockedIP, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {blockedIP.ip}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {blockedIP.attempts} attempts
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{formatDate(blockedIP.firstAttempt)}</div>
                        <div className="text-xs text-gray-400">{getTimeAgo(blockedIP.firstAttempt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{formatDate(blockedIP.lastAttempt)}</div>
                        <div className="text-xs text-gray-400">{getTimeAgo(blockedIP.lastAttempt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          🔒 Blocked
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Security Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Security Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-blue-800">Rate Limiting Rules:</strong>
              <ul className="mt-2 text-blue-700 space-y-1">
                <li>• Maximum 5 failed attempts per IP</li>
                <li>• 15-minute blocking window</li>
                <li>• Automatic cleanup every 5 minutes</li>
              </ul>
            </div>
            <div>
              <strong className="text-blue-800">Session Security:</strong>
              <ul className="mt-2 text-blue-700 space-y-1">
                <li>• HTTP-only cookies</li>
                <li>• 7-day session expiry</li>
                <li>• JWT token validation</li>
                <li>• Secure flag in production</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 