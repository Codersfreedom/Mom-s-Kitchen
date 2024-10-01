import { ArrowBigUp, Facebook, Instagram, Mail, Search, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <div className='h-72 z-30 w-full p-4 bg-black text-white flex flex-col gap-3 justify-between items-center'>
            <div className='flex gap-3'>
                <ArrowBigUp />
                <p>BACK TO TOP</p>

            </div>
            {/* <div className='flex gap-4'>
                <Facebook />
                <Instagram />
                <Twitter />
                <Youtube />
                <Mail />
            </div> */}
            <div>
                <p>Made with ♥ by <a href="">Rakesh</a> </p>
            </div>
        </div>
    )
}

export default Footer
