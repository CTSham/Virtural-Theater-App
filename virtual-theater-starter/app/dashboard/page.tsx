export const metadata = { title: "Filmmaker Dashboard • Virtual Theater" };

export default function Dashboard() {
  return (
    <div className="vstack">
      <h1>Filmmaker Dashboard</h1>
      <div className="panel vstack">
        <button className="btn">⬆️ Upload New Film (wire later)</button>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
          <div className="panel">
            <div className="small">Views</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>3,200</div>
          </div>
          <div className="panel">
            <div className="small">Tickets Sold</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>1,450</div>
          </div>
          <div className="panel">
            <div className="small">Revenue</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>$7,250</div>
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
