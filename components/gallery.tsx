export default function Gallery({ url1, url2 } : { url1 : string, url2 : string }){
  return (
    <div className="row" style={{display: "flex"}}>
      <div className="column">
        <img
          src={url1}
          style={{ border: '1px solid rgb(220, 220, 220)' }}
        />
      </div>
      <div className="column">
        <img
          src={url2}
          style={{ border: '1px solid rgb(220, 220, 220)' }}
        />
      </div>
    </div>
  );
}