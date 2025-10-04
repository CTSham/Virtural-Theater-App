export const metadata = { title: "Filmmaker Dashboard • Virtual Theater" };

export default function Dashboard() {
  return (
    <div className="vstack">
      <h1>Filmmaker Dashboard</h1>
      <div className="panel vstack">
        <button className="btn">⬆️ Upload New Film (wire later)</button>
        <div className="grid grid-3col">
          <div className="panel">
            <div className="small">Views</div>
            <div className="font-size-24 font-weight-700">3,200</div>
          </div>
          <div className="panel">
            <div className="small">Tickets Sold</div>
            <div className="font-size-24 font-weight-700">1,450</div>
          </div>
          <div className="panel">
            <div className="small">Revenue</div>
            <div className="font-size-24 font-weight-700">$7,250</div>
          </div>
        </div>
        <div className="small">
          This is a demo dashboard. Replace with real analytics after wiring
          payments + streaming.
        </div>
      </div>
    </div>
  );
}
