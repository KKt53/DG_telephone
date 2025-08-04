import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from './Header'
import Footer from './Footer'

export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta name="google-site-verification" content="4vCiz7a82kEvLon-2AKxB1ClAAUiNJHj7EMmXtnkCps" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" 
          crossorigin="anonymous"></link>
      </Head>
      <Header header={props.header} />
      <div className="container">
        <h3 className="my-3 text-primary text-center">
          </h3>
          {props.children}
      </div>
      <Footer footer="created By Kota Kamon." />
    </div>
  )
}