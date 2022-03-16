const Layout: React.FC = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 left-0'></header>
      <main className='flex-1 px-[2vmin] max-w-5xl w-full mx-auto py-8'>
        {children}
      </main>
      <footer></footer>
    </div>
  )
}

export default Layout
