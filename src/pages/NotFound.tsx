const NotFound = () => (
  <div className="grid grid-cols-1 min-h-screen place-items-center px-5 text-center">
    <div>
      <p className="eyebrow text-accent">Error 404 · block not found</p>
      <h1 className="mt-5 text-7xl md:text-9xl grad-text">404</h1>
      <a href="/" className="mt-8 inline-block rounded-full grad-bg px-6 py-3 font-semibold on-grad">
        Back to the portfolio
      </a>
    </div>
  </div>
);

export default NotFound;
