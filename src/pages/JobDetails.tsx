import { useParams } from 'react-router-dom'
import { ArrowLeft, Users, Target, CheckCircle, TrendingUp } from 'lucide-react'
import { jobs } from '../data/jobs'
import { parsedJDs } from '../data/parsedJDs'
import { candidates } from '../data/candidates'
import Sidebar from '../components/Sidebar'
import MatchCard from '../components/MatchCard'
import { Link } from 'react-router-dom'

export default function JobDetails() {
  const { id } = useParams()
  const job = jobs.find(j => j.id === id)
  const parsedJD = parsedJDs.find(p => p.jobId === id)

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Job not found
          </h1>
          <Link
            to="/recruiter/dashboard"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // Generate mock matches
  const matches = candidates.slice(0, 4).map((candidate, _index) => ({
    jobId: id!,
    candidateId: candidate.id,
    score: Math.floor(Math.random() * 30) + 70, // 70-99
    matchedSkills: Object.keys(candidate.skills).slice(0, 5),
    evidence: [
      `${candidate.name} has demonstrated ${Object.keys(candidate.skills)[0]} skills in recent projects`,
      `Successfully completed projects matching ${job.title} requirements`
    ],
    status: 'pending' as const,
    lastUpdated: '2024-01-15'
  }))

  return (
    <div className="flex min-h-screen page-transition">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/recruiter/dashboard"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Dashboard
            </Link>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {job.title}
                </h1>
                <div className="flex items-center space-x-6 mt-2">
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <Target size={20} />
                    <span>{job.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                    <Users size={20} />
                    <span>{matches.length} Matches Found</span>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold">
                {job.salary}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Parsed JD */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Job Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {job.jdText}
                </p>
              </div>

              {/* Parsed JD Details */}
              {parsedJD && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800/50">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      AI-Parsed Requirements
                    </h2>
                  </div>

                  <div className="space-y-8">
                    {/* Required Skills */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {parsedJD.requiredSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-300 rounded-lg font-medium flex items-center"
                          >
                            <CheckCircle className="mr-2" size={16} />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Nice to Have */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Nice to Have
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {parsedJD.niceToHave.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 rounded-lg font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Key Responsibilities
                      </h3>
                      <ul className="space-y-3">
                        {parsedJD.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 mt-0.5">
                              <div className="h-2 w-2 rounded-full bg-blue-500" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Summary */}
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        AI Summary
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 italic">
                        {parsedJD.summary}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Matches Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Top Matches ({matches.length})
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {matches.map((match, index) => (
                    <MatchCard key={index} {...match} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Info */}
            <div className="space-y-8">
              {/* Job Stats */}
              <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Job Statistics
                </h3>
                
                <div className="space-y-6">
                  {[
                    { label: 'Total Views', value: '1,248', change: '+12%' },
                    { label: 'Applications', value: '84', change: '+8%' },
                    { label: 'Avg Match Score', value: '82%', change: '+5%' },
                    { label: 'Time to Hire', value: '14 days', change: '-3 days' }
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{stat.label}</span>
                      <div className="text-right">
                        <div className="font-bold text-gray-900 dark:text-white">{stat.value}</div>
                        <div className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {stat.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-2xl p-6 border border-blue-200 dark:border-blue-800/50">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Quick Actions
                </h3>
                
                <div className="space-y-4">
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                    Contact All Matches
                  </button>
                  <button className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:border-blue-500 transition-colors">
                    Schedule Interviews
                  </button>
                  <button className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-xl font-semibold hover:border-blue-500 transition-colors">
                    Export Matches
                  </button>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  AI Insights
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <div className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">
                      Strong Candidate Pool
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      85% of candidates have required skills with 3+ years experience
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                    <div className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                      Competitive Salary
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your salary range is 15% above market average
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}