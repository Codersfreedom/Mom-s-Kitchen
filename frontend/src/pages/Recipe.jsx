import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Input } from "@chakra-ui/react"
import { BicepsFlexed, Bookmark, Camera, Clock, Download, Heart, LogIn, Printer, Salad, Share, Smile, Star } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"


const Recipe = () => {
    const [isShowingReplies, setIsShowingReplies] = useState(false);
    const [isClickedReply, setIsClickedReply] = useState(false);

    const handleReply = () => {
        if (!isClickedReply) {
            setIsClickedReply(true);
        }
        //TODO:Set isClickedReply false after successfull reply
    }
    return (
        <div className="min-h-screen w-full p-5 ">

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
            <Button colorScheme="yellow">Follow</Button>
            <p className="text-xl py-4">"This is a sure fire method of making a tender pot roast every time."</p>

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
                    leftIcon={<Camera />}
                    size={'lg'}
                    width={'100%'}
                    variant={'solid'}
                    colorScheme="yellow"
                >I Made This</Button>
            </div>

            <div className="flex flex-col gap-3 justify-center py-4">
                <p className="flex  gap-2"> <Clock /> Ready In:4hr 10mins </p>
                <p className="flex  gap-2"> <Salad /> Ingrediants:12 </p>
            </div>
            <h2 className="flex gap-2 text-md text-yellow-600 font-semibold"> <BicepsFlexed /> Nutrition information</h2>
            <div className="w-1/2 h-fit py-2">
                <ul className="list-disc list-inside">
                    <li>Calories: </li>
                    <li>Total Fat: </li>
                    <li>Cholesterol:</li>
                    <li>Protein:</li>
                </ul>


            </div>
            <h1 className="text-2xl">Ingredients</h1>
            <div>
                <ol className="list-decimal list-inside">
                    <li >
                        Step 1
                    </li>
                    <li>
                        Step 2
                    </li>
                    <li>
                        Step 3
                    </li>
                </ol>
            </div>

            <div className="py-2">
                <h1 className="text-xl font-semibold"> Directions</h1>

                <ol className="list-decimal list-inside">
                    <li>First direction</li>
                </ol>

            </div>

            <div className="flex flex-col gap-3 w-full  py-4">
                <h1 className="text-xl font-semibold">Questions & Replies</h1>

                <div className="w-full lg:w-1/2 py-2 flex flex-col gap-3">
                  <Input placeholder="ask a question" rounded={'15px'} />
                <Button colorScheme="yellow" leftIcon={<LogIn />}> Sign in to ask a question</Button>  
                </div>
                

                <Card>
                    <CardHeader className="flex gap-4 items-center">
                        <Avatar src="/Men jacket.avif" />
                        <Link to={'profile/34234'}>John doe</Link>
                    </CardHeader>

                    <CardBody>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis porro, hic modi atque reiciendis dolores magnam distinctio ducimus obcaecati officiis!</p>
                    </CardBody>
                    <CardFooter className="flex flex-col gap-3">
                        <div className="w-full flex justify-between gap-2">
                            {!isClickedReply && <Button onClick={(e) => setIsShowingReplies(!isShowingReplies)}>
                                {isShowingReplies ? 'Hide 3 Replies' : 'Show 3 Replies'}
                            </Button>}
                            {isClickedReply && <Input placeholder="Type reply.." />}
                            <div className="flex gap-4 items-center">
                                <Button onClick={handleReply}>Reply</Button>
                                <div className="flex gap-1 items-center">
                                    <Heart className="cursor-pointer" color="red" />
                                    <p>4 </p>
                                </div>

                            </div>
                        </div>

                        {isShowingReplies && <div className="w-full flex border-t-2 py-3">
                            <div className="w-full">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-4 items-center pb-2">
                                        <Avatar />
                                        <Link to={'/profile/45345'}>John doe</Link>
                                    </div>
                                    <div>
                                        2 march 2024
                                    </div>
                                </div>

                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, accusamus?</p>
                            </div>
                        </div>}
                    </CardFooter>

                </Card>
            </div>

            <h1 className="text-2xl font-semibold">You'll also love</h1>

            <div className=" w-full grid gap-2 grid-cols-2 lg:grid-cols-4 py-3">
                <Link to={'/recipe/34234'} className="flex flex-col gap-3">
                    <div>
                        <img src="/1.webp" alt="" />
                    </div>
                    <div>
                        <p>Oven Baked BBQ</p>
                    </div>
                </Link>

                <Link to={'/recipe/34234'} className="flex flex-col gap-3">
                    <div>
                        <img src="/1.webp" alt="" />
                    </div>
                    <div>
                        <p>Oven Baked BBQ</p>
                    </div>
                </Link>  <Link to={'/recipe/34234'} className="flex flex-col gap-3">
                    <div>
                        <img src="/1.webp" alt="" />
                    </div>
                    <div>
                        <p>Oven Baked BBQ</p>
                    </div>
                </Link>

            </div>

        </div>
    )
}

export default Recipe
