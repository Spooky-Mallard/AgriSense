import instagramIcon from "../icons/instagram-167-svgrepo-com.svg"
import youtubeIcon from "../icons/youtube-svgrepo-com.svg"
import linkedinIcon from "../icons/linkedin-161-svgrepo-com.svg"
import twitterIcon from "../icons/twitter-154-svgrepo-com.svg"


const Footer = () => {
  return (
    <footer className="flex justify-center flex-row space-x-6 p-6 bg-background text-primary">
      
        <img src={twitterIcon} alt="X" className="footer-style m-10 opacity-70 hover:opacity-100"/>
    
        <img src={instagramIcon} alt="Instagram" className="footer-style m-10 opacity-70 hover:opacity-100"/>
        <img src={youtubeIcon} alt="Youtube" className="footer-style m-10 opacity-70 hover:opacity-100"/>
        <img src={linkedinIcon} alt="Linkedin" className="footer-style m-10 opacity-70 hover:opacity-100"/>
    </footer>
  );
}

export default Footer;
