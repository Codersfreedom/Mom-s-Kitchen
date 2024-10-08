import { Button } from '@chakra-ui/react';
import { ArrowBigUp, Facebook, Heart, Instagram, Mail, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    const handleScrollTop = () => {
        globalThis.scrollTo({ top: 0, left: 0, behaviour: "smooth" })
    }
    return (
        <div className='h-72 z-30 w-full p-4 bg-black text-white flex flex-col gap-3 justify-between items-center'>
            <div className='flex gap-3 items-center'>
                <Button
                leftIcon={<ArrowBigUp/>}
                onClick={handleScrollTop}
                >Scroll To Top</Button>


            </div>
            <div className='flex gap-4'>
                <Facebook />
                <a href="https://instagram.com/rakeshmanna717"><Instagram />
                </a>
                <Twitter />
                <Youtube />
                <a href="mailto:rakeshmanna762@gmail.com"><Mail /></a>
            </div>
            <div>
                <p className='flex items-center gap-2'>Made With {<Heart color='red' fill='red' />} By <a target='_blank' href="https://github.com/codersfreedom">Rakesh</a> </p>
            </div>
        </div>
    )
}

export default Footer
