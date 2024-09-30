import { Avatar, Button } from "@chakra-ui/react"
import { BicepsFlexed, Bookmark, BookMarked, Camera, Clock, Download, Printer, Salad, Share, Star } from "lucide-react"
import { Link } from "react-router-dom"


const Recipe = () => {
    return (
        <div className="min-h-screen w-full p-3  ">

            <h1 className="text-4xl font-bold">Recipe Name</h1>
            <div className="flex gap-2 py-4">
                <Star fill="yellow" />
                <Star fill="yellow" />
                <Star fill="yellow" />
                <Star fill="yellow" />
            </div>
            <hr />
            <div className="py-4 flex gap-2 items-center">
                <Avatar src="/Men jacket.avif" />
                <h2 className="text-2xl">Submitted by <Link to={'/profile/:id'} className="text-blue-400">John doe</Link> </h2>
            </div>
            <p className="text-xl">"This is a sure fire method of making a tender pot roast every time."</p>

            <div className="flex gap-3 py-4">
                <Button

                >
                    <Bookmark /> Save
                </Button>
                <Button

                >
                    <Download /> Download
                </Button>
                <Button

                >
                    <Printer /> Print
                </Button>
                <Button

                >
                    <Share /> Share
                </Button>
            </div>

            <div className="lg:w-[800px] lg:h-[530px]">
                <img src="/pot roast.webp" className=" h-full w-full  " alt="recipe_featured_image" />
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-4 gap-1 lg:gap-4 max-w-[800px] max-h-fit py-4">
                <div className="lg:w-[188px] lg:h-[125px]">
                    <img src="/1.webp" alt="thumnail" className="h-full w-full" />
                </div>
                <div className=" lg:w-[188px] lg:h-[125px]">
                    <img src="/1.webp" alt="thumnail" className="h-full w-full" />
                </div>
                <div className=" relative lg:w-[188px] lg:h-[125px]">
                    <img src="/3.webp" alt="thumnail" className="h-full w-full" />
                    <p className=" lg:hidden text-sm text-white font-bold absolute top-1/3 left-1/3 cursor-pointer ">VIEW ALL</p>
                </div>
                <div className="lg:w-[188px] lg:h-[125px] hidden lg:block">
                    <img src="/2.webp" alt="thumnail" className="h-full w-full" />
                </div>
            </div>

            <div className="w-full lg:w-1/3">
                <Button
                leftIcon={<Camera/>}
                size={'lg'}
                width={'100%'}
                variant={'solid'}
                colorScheme="yellow"
                >I Made This</Button>
            </div>

            <div className="flex flex-col gap-3 justify-center py-4">
                <p className="flex  gap-2"> <Clock/> Ready In:4hr 10mins </p>
                <p className="flex  gap-2"> <Salad /> Ingrediants:12 </p>
            </div>
            <h2 className="flex gap-2 text-md text-yellow-600 font-semibold"> <BicepsFlexed /> Nutrition information</h2>
        </div>
    )
}

export default Recipe
