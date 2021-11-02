export default function InfoBanner(props){
    return(<>
    <div className="banner banner1">
  <h1>{props.header}</h1>
  <span className="message">{props.message}</span>
 </div></>)
}