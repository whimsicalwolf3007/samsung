import React, { useMemo, useState, useEffect, useRef, createContext, useContext } from 'react'
import { SAMPLE_WORKLETS, STATUS_OPTIONS } from '../components/data'
import { ChevronDown, Users, CheckCircle, Download, Moon, Sun } from 'lucide-react'
import LeftSidebar from '../components/Left'

// --- 1. THEME CONTEXT AND PROVIDER ---
// Create a context to manage the theme
const ThemeContext = createContext()

// Custom hook to easily access theme state and toggle function
export const useTheme = () => useContext(ThemeContext)

// Provider component that wraps the app and makes theme available
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme in localStorage or default to 'light'
    const savedTheme = localStorage.getItem('dashboard-theme')
    return savedTheme || 'light'
  })

  // Update localStorage whenever the theme changes
  useEffect(() => {
    localStorage.setItem('dashboard-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const value = { theme, toggleTheme }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// --- Helper Components (Unchanged) ---
const AnimationStyles = () => (
  <style>{`
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes growBar { from { transform: scaleY(0); } to { transform: scaleY(1); } }
    @keyframes spinIn { from { opacity: 0; transform: scale(0.5) rotate(-90deg); } to { opacity: 1; transform: scale(1) rotate(0deg); } }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .hide-scrollbar::-webkit-scrollbar { display: none; }
  `}</style>
)
const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0
          const end = value
          const duration = 1500
          const startTime = performance.now()
          const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime
            const progress = Math.min(elapsedTime / duration, 1)
            const currentVal = Math.floor(progress * (end - start) + start)
            setDisplayValue(currentVal)
            if (progress < 1) requestAnimationFrame(animate)
            else setDisplayValue(end)
          }
          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])
  return <span ref={ref}>{displayValue.toLocaleString()}</span>
}
const Bar = ({ value, label, maxValue, color, delay, styles }) => {
  const barHeight = maxValue > 0 ? (value / maxValue) * 100 : 0
  return (
    <div style={styles.barContainer}>
      <div style={styles.barValue}>{value}</div>
      <div style={{ ...styles.bar, height: `${barHeight}%`, backgroundColor: color, animationDelay: delay }}></div>
      <div style={styles.barLabel}>{label}</div>
    </div>
  )
}

// --- Main Dashboard Component ---
const StatisticsDashboard = () => {
  const { theme, toggleTheme } = useTheme() // Use the theme context
  const styles = useMemo(() => getStyles(theme), [theme]) // Generate styles based on the current theme

  // --- Data processing (Unchanged) ---
  const stats = useMemo(() => {
    const statusCounts = STATUS_OPTIONS.reduce((acc, status) => ({ ...acc, [status]: 0 }), {})
    SAMPLE_WORKLETS.forEach((w) => {
      if (w.status in statusCounts) statusCounts[w.status]++
    })
    const totalStudents = SAMPLE_WORKLETS.reduce((acc, w) => acc + w.students.length, 0)
    const totalWorklets = SAMPLE_WORKLETS.length
    const performanceCounts = { Excellent: 0, 'Very Good': 0, Good: 0, Average: 0, Poor: 0 }
    const imageQualityMap = {
      Excellence: 'Excellent',
      'Very Good': 'Very Good',
      Good: 'Good',
      Average: 'Average',
      'Needs Attention': 'Poor',
    }
    SAMPLE_WORKLETS.filter((w) => w.status === 'Ongoing').forEach((w) => {
      const performanceCategory = imageQualityMap[w.quality] || 'Poor'
      if (performanceCategory in performanceCounts) {
        performanceCounts[performanceCategory]++
      }
    })
    return { statusCounts, totalStudents, totalWorklets, performanceCounts }
  }, [])

  const engagementData = {
    Students: stats.totalStudents,
    Professors: 150,
    Mentors: 90,
    Worklets: stats.totalWorklets,
    Papers: 6,
    Patents: 2,
  }
  const riskData = { 'High Risk': 2, 'Medium Risk': 5, 'Low Risk': 11 }
  const totalRisk = Object.values(riskData).reduce((a, b) => a + b, 0)

  const maxStatusValue = Math.max(...Object.values(stats.statusCounts), 1)
  const maxPerformanceValue = Math.max(...Object.values(stats.performanceCounts), 1)

  return (
    <>
      <AnimationStyles />
      <div style={styles.pageContainer} className="hide-scrollbar">
        <div style={styles.sidebarWrapper} className="hide-scrollbar">
          <LeftSidebar />
        </div>

        <main style={styles.mainContent}>
          <header style={styles.header}>
            <div style={styles.headerLeft}>
              <div style={styles.logoContainer}>
                <span style={styles.samsungLogo}>SAMSUNG</span>
                <span style={styles.prismLogo}>
                  <span style={styles.prismBracket}>&lt;/&gt;</span>PRISM
                </span>
              </div>
            </div>
            <div style={styles.headerRight}>
              {/* Dropdowns (unchanged) */}
              <div style={styles.dropdown}>
                <button style={styles.dropdownButton}>
                  TECH STRATEGY TEAM <ChevronDown size={16} />
                </button>
              </div>
              <div style={styles.dropdown}>
                <button style={styles.dropdownButton}>
                  R&D Strategy Group <ChevronDown size={16} />
                </button>
              </div>
              <div style={styles.dropdown}>
                <button style={styles.dropdownButton}>
                  All Parts <ChevronDown size={16} />
                </button>
              </div>
              <div style={styles.dropdown}>
                <button style={styles.dropdownButton}>
                  All Years <ChevronDown size={16} />
                </button>
              </div>
              {/* --- DARK MODE TOGGLE BUTTON --- */}
              <button onClick={toggleTheme} style={styles.themeToggleButton} title="Toggle Theme">
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </header>

          <div style={styles.dashboardContainer}>
            {/* Cards using dynamic styles */}
            <div style={{ ...styles.card, animationDelay: '0.1s' }}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Overall Worklet Status</h3>
                <button style={styles.exportButton}>
                  Export <Download size={14} style={{ marginLeft: '4px' }} />
                </button>
              </div>
              <div style={styles.barChart}>
                {Object.entries(stats.statusCounts).map(([status, count], index) => (
                  <Bar
                    key={status}
                    label={status}
                    value={count}
                    maxValue={maxStatusValue}
                    color={styles.statusColors[status]}
                    delay={`${index * 0.1 + 0.5}s`}
                    styles={styles}
                  />
                ))}
              </div>
            </div>
            {/* Rest of the cards follow... */}
            <div style={{ ...styles.card, animationDelay: '0.2s' }}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Total Engagement</h3>
                <button style={styles.exportButton}>
                  Export <Download size={14} style={{ marginLeft: '4px' }} />
                </button>
              </div>
              <div style={styles.engagementGrid}>
                {Object.entries(engagementData).map(([label, value], index) => (
                  <div key={label} style={{ ...styles.kpiBubble, animationDelay: `${index * 0.05 + 0.3}s` }}>
                    {/* Icons here are unchanged */}
                    <h4 style={styles.kpiBubbleH4}>
                      <AnimatedNumber value={value} />
                    </h4>
                    <p style={styles.kpiBubbleP}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ ...styles.card, animationDelay: '0.3s' }}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Ongoing Worklet Performance</h3>
                <button style={styles.exportButton}>
                  Export <Download size={14} style={{ marginLeft: '4px' }} />
                </button>
              </div>
              <div style={styles.barChart}>
                {Object.entries(stats.performanceCounts).map(([quality, count], index) => (
                  <Bar
                    key={quality}
                    label={quality}
                    value={count}
                    maxValue={maxPerformanceValue}
                    color={styles.performanceColors[quality]}
                    delay={`${index * 0.1 + 0.5}s`}
                    styles={styles}
                  />
                ))}
              </div>
            </div>
            <div style={{ ...styles.card, animationDelay: '0.4s' }}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Ongoing Worklet Risk</h3>
                <button style={styles.exportButton}>
                  Export <Download size={14} style={{ marginLeft: '4px' }} />
                </button>
              </div>
              <div style={styles.donutChartContainer}>
                <div style={{ ...styles.donutChartWrapper, animationDelay: '0.6s' }}>
                  <div
                    style={{
                      ...styles.donutChart,
                      background: `conic-gradient(${styles.riskSliceColors['High Risk']} 0deg ${
                        (riskData['High Risk'] / totalRisk) * 360
                      }deg, ${styles.riskSliceColors['Medium Risk']} ${(riskData['High Risk'] / totalRisk) * 360}deg ${
                        ((riskData['High Risk'] + riskData['Medium Risk']) / totalRisk) * 360
                      }deg, ${styles.riskSliceColors['Low Risk']} ${
                        ((riskData['High Risk'] + riskData['Medium Risk']) / totalRisk) * 360
                      }deg 360deg)`,
                    }}></div>
                  <div style={styles.donutChartCenter}>
                    <span style={styles.donutChartTotalLabel}>Total</span>
                    <span style={styles.donutChartTotalValue}>
                      <AnimatedNumber value={totalRisk} />
                    </span>
                  </div>
                </div>
                <div style={styles.donutLegend}>
                  {Object.entries(riskData).map(([riskType, count]) => (
                    <div key={riskType} style={styles.legendItem}>
                      <span style={{ ...styles.legendDot, backgroundColor: styles.riskSliceColors[riskType] }}></span>
                      {riskType}
                      <span style={styles.legendCount}>
                        <AnimatedNumber value={count} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

// --- App Root Component ---
// This component wraps the dashboard with the ThemeProvider
const App = () => {
  return (
    <ThemeProvider>
      <StatisticsDashboard />
    </ThemeProvider>
  )
}

export default App

// --- 2. DYNAMIC STYLES ---

// Color palettes for light and dark themes
const lightColors = {
  pageBg: '#eef2f6',
  mainText: '#334155',
  cardBg: '#ffffff',
  cardBorder: '#e2e8f0',
  headerBg: '#ffffff',
  headerBorder: '#e2e8f0',
  titleText: '#1e293b',
  labelText: '#64748b',
  dropdownBg: '#f1f5f9',
  dropdownBorder: '#cbd5e1',
  dropdownText: '#475569',
  samsungLogo: '#0a1d41',
  prismLogo: '#005a9e',
  prismBracket: '#60a5fa',
  barChartGrid: '#f1f5f9',
  kpiBubbleBg: '#e0f2fe',
  kpiBubbleBorder: '#90cdf4',
  kpiBubbleIcon: '#1d4ed8',
  kpiBubbleTitle: '#1e3a8a',
  kpiBubbleSubtext: '#3b82f6',
  donutCenterBg: '#ffffff',
  statusColors: {
    Completed: '#2D3748',
    Ongoing: '#4299E1',
    'On Hold': '#ECC94B',
    Dropped: '#F6AD55',
    Terminated: '#E2E8F0',
  },
  performanceColors: {
    Excellent: '#2D3748',
    'Very Good': '#4299E1',
    Good: '#A0AEC0',
    Average: '#F6AD55',
    Poor: '#E2E8F0',
  },
  riskSliceColors: { 'High Risk': '#2D3748', 'Medium Risk': '#4299E1', 'Low Risk': '#E2E8F0' },
}

const darkColors = {
  pageBg: '#1e293b',
  mainText: '#cbd5e1',
  cardBg: '#334155',
  cardBorder: '#475569',
  headerBg: '#283447',
  headerBorder: '#475569',
  titleText: '#f1f5f9',
  labelText: '#94a3b8',
  dropdownBg: '#475569',
  dropdownBorder: '#64748b',
  dropdownText: '#e2e8f0',
  samsungLogo: '#ffffff',
  prismLogo: '#90cdf4',
  prismBracket: '#60a5fa',
  barChartGrid: '#475569',
  kpiBubbleBg: '#273453',
  kpiBubbleBorder: '#3c528a',
  kpiBubbleIcon: '#90cdf4',
  kpiBubbleTitle: '#dbeafe',
  kpiBubbleSubtext: '#93c5fd',
  donutCenterBg: '#334155',
  statusColors: {
    Completed: '#9AE6B4',
    Ongoing: '#63B3ED',
    'On Hold': '#F6E05E',
    Dropped: '#F6AD55',
    Terminated: '#A0AEC0',
  },
  performanceColors: {
    Excellent: '#9AE6B4',
    'Very Good': '#63B3ED',
    Good: '#A0AEC0',
    Average: '#F6AD55',
    Poor: '#718096',
  },
  riskSliceColors: { 'High Risk': '#FC8181', 'Medium Risk': '#F6E05E', 'Low Risk': '#63B3ED' },
}

// Function to generate styles based on the theme
const getStyles = (theme = 'light') => {
  const palette = theme === 'dark' ? darkColors : lightColors

  return {
    pageContainer: {
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: palette.pageBg,
      color: palette.mainText,
      fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      transition: 'background-color 0.3s, color 0.3s',
    },
    sidebarWrapper: {
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto',
      overflowX: 'hidden',
      flexShrink: 0,
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      backgroundColor: palette.headerBg,
      borderBottom: `1px solid ${palette.headerBorder}`,
      boxShadow: theme === 'light' ? '0 2px 4px rgba(0,0,0,0.04)' : '0 2px 4px rgba(0,0,0,0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      transition: 'background-color 0.3s, border-color 0.3s',
    },
    headerLeft: { display: 'flex', alignItems: 'center' },
    logoContainer: { display: 'flex', alignItems: 'baseline', gap: '4px', marginRight: '24px' },
    samsungLogo: { fontSize: '18px', fontWeight: '700', color: palette.samsungLogo, letterSpacing: '-0.5px' },
    prismLogo: {
      fontSize: '16px',
      fontWeight: '600',
      color: palette.prismLogo,
      display: 'flex',
      alignItems: 'baseline',
    },
    prismBracket: { color: palette.prismBracket, fontSize: '18px', marginRight: '2px', fontWeight: '700' },
    headerRight: { display: 'flex', gap: '12px', alignItems: 'center' },
    dropdown: { position: 'relative' },
    dropdownButton: {
      backgroundColor: palette.dropdownBg,
      border: `1px solid ${palette.dropdownBorder}`,
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '14px',
      color: palette.dropdownText,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      transition: 'background-color 0.2s, border-color 0.2s',
    },
    themeToggleButton: {
      backgroundColor: palette.dropdownBg,
      border: `1px solid ${palette.dropdownBorder}`,
      color: palette.dropdownText,
      borderRadius: '8px',
      padding: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    dashboardContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
      gap: '24px',
      padding: '24px',
    },
    card: {
      backgroundColor: palette.cardBg,
      borderRadius: '16px',
      padding: '24px',
      boxShadow:
        theme === 'light'
          ? '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.07)'
          : '0 4px 10px -1px rgba(0,0,0,0.2)',
      border: `1px solid ${palette.cardBorder}`,
      display: 'flex',
      flexDirection: 'column',
      opacity: 0,
      transform: 'translateY(20px)',
      animation: 'fadeInUp 0.6s ease-out forwards',
      transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
    },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    cardTitle: { margin: 0, color: palette.titleText, fontSize: '18px', fontWeight: '700' },
    exportButton: {
      backgroundColor: 'transparent',
      border: `1px solid ${palette.dropdownBorder}`,
      borderRadius: '8px',
      padding: '6px 10px',
      fontSize: '13px',
      color: palette.dropdownText,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    },
    barChart: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      height: '220px',
      padding: '16px 0',
      flexGrow: 1,
      position: 'relative',
      backgroundSize: '100% 25%',
      backgroundImage: `linear-gradient(to top, ${palette.barChartGrid} 1px, transparent 1px)`,
      borderRadius: '8px',
      overflow: 'hidden',
    },
    barContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '18%',
      textAlign: 'center',
      height: '100%',
      justifyContent: 'flex-end',
      position: 'relative',
      zIndex: 1,
    },
    bar: {
      width: '80%',
      borderRadius: '4px 4px 0 0',
      boxShadow: 'inset 0 -2px 4px rgba(0, 0, 0, 0.1)',
      transformOrigin: 'bottom',
      animation: 'growBar 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
    },
    barValue: {
      fontSize: '14px',
      fontWeight: '600',
      color: palette.titleText,
      marginBottom: '8px',
      whiteSpace: 'nowrap',
    },
    barLabel: { marginTop: '12px', fontSize: '12px', color: palette.labelText, fontWeight: '500', textAlign: 'center' },
    engagementGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      textAlign: 'center',
      flexGrow: 1,
      paddingTop: '10px',
    },
    kpiBubble: {
      padding: '16px',
      borderRadius: '12px',
      backgroundColor: palette.kpiBubbleBg,
      border: `1px solid ${palette.kpiBubbleBorder}`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'transform 0.2s',
      opacity: 0,
      transform: 'translateY(10px)',
      animation: 'fadeInUp 0.4s ease-out forwards',
    },
    kpiBubbleIcon: { color: palette.kpiBubbleIcon, marginBottom: '8px' },
    kpiBubbleH4: { margin: 0, fontSize: '24px', fontWeight: '700', color: palette.kpiBubbleTitle },
    kpiBubbleP: { margin: '4px 0 0 0', fontSize: '13px', color: palette.kpiBubbleSubtext, fontWeight: '500' },
    donutChartContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '30px',
      flexGrow: 1,
      paddingTop: '16px',
    },
    donutChartWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'spinIn 0.8s ease-out forwards',
      width: '180px',
      height: '180px',
    },
    donutChart: { width: '100%', height: '100%', borderRadius: '50%', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' },
    donutChartCenter: {
      position: 'absolute',
      backgroundColor: palette.donutCenterBg,
      width: '110px',
      height: '110px',
      borderRadius: '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${palette.cardBorder}`,
    },
    donutChartTotalLabel: { color: palette.labelText, fontSize: '13px', fontWeight: '500' },
    donutChartTotalValue: { color: palette.titleText, fontSize: '26px', fontWeight: '700' },
    donutLegend: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      fontSize: '14px',
      color: palette.mainText,
      minWidth: '120px',
    },
    legendItem: { display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' },
    legendDot: { height: '12px', width: '12px', borderRadius: '4px', display: 'inline-block', flexShrink: 0 },
    legendCount: { fontWeight: '600', color: palette.titleText, marginLeft: 'auto' },
    // Chart Colors
    statusColors: palette.statusColors,
    performanceColors: palette.performanceColors,
    riskSliceColors: palette.riskSliceColors,
  }
}
