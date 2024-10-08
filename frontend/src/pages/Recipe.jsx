import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, IconButton, Input } from "@chakra-ui/react"
import { BicepsFlexed, Bookmark, Camera, Clock, Download, Heart, Lightbulb, LogIn, Printer, Salad, SendHorizontalIcon, Share, Star, Trash, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import useRecipeStore from "../../store/useRecipeStore"
import useAuthStore from "../../store/useAuthStore"
import useUserStore from "../../store/useUserStore"
import toast from "react-hot-toast"
import { formatDate } from "../lib/utils"


const Recipe = () => {
    const [showReplies, setShowReplies] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const [questionData, setQuestionData] = useState('');
    const [reply, setReply] = useState('');
    const [recipe, setRecipe] = useState({});
    const [similar, setSimilar] = useState(null);

    const { getRecipeById, getSimilar, isLoading: isFetching } = useRecipeStore();
    const { user, follow, isLoading, addToFavorite } = useAuthStore();
    const { questions, fetchQuestions, askQuestions, deleteQuestion, postReply, deleteReply, isLoading: isPosting } = useUserStore();

    const { id } = useParams();
    const navigate = useNavigate();



    useEffect(() => {
        const getRecipe = async () => {
            setRecipe(await getRecipeById(id))
        }
        getRecipe();
    }, [id])

    useEffect(() => {
        const fetchSimilar = async () => {
            setSimilar(await getSimilar());
        }
        fetchSimilar()
    }, [getSimilar])


    useEffect(() => {
        fetchQuestions(id);
    }, [id])

    const isFollowing = user?.following.some((follow) => follow._id === recipe.user)
    const isFavorite = user?.favorites.some((favorite) => favorite._id === recipe?._id)
  
    const handleToggleReplies = (question_id) => {

        setShowReplies((prev) => ({
            ...prev,
            [question_id]: !prev[question_id],
        }))
    }

    const handleShowReplyInput = (inputId) => {
        setShowReplyInput((prev) => ({
            ...prev,
            [inputId]: !prev[inputId]
        }))
    }

    const handleAskQuestion = () => {
        if (!questionData) {
            return toast.error("Please enter question to ask!")
        }
        askQuestions(id, questionData)
        setQuestionData(" ");
    }

    const handleSendReply = (questionId) => {
        if (!reply) {
            return toast.error("Please enter something to reply")
        }
        if (!user) {
            return toast.error("Please login to post a reply")
        }
        postReply(questionId, reply)
        setShowReplyInput((prev) => ({
            ...prev,
            [questionId]: !prev[questionId]
        }))
    }


    const handleDeleteQuestion = (questionId) => {
        if (!user) {

            return toast.error("Please login to delete the question");
        }
        deleteQuestion(questionId)
    }

    const handleDeleteReply = (questionId, answerId) => {
        deleteReply(questionId, answerId);
    }

    return (
        <div className="min-h-screen w-full p-5 lg:w-4/5 mx-auto ">

            <h1 className="text-4xl font-bold">{recipe?.title}</h1>
            <div className="flex gap-2 py-4">
                <Star fill="yellow" />
                <Star fill="yellow" />
                <Star fill="yellow" />
                <Star fill="yellow" />
            </div>
            <hr />
            <div className="py-4 flex gap-2 items-center">
                <Avatar src="/Men jacket.avif" />
                <h2 className="text-2xl">Submitted by <Link to={`/profile/${recipe?.user}`} className="text-blue-400">{recipe?.name || "No name"}</Link> </h2>
            </div>
            <div className="flex gap-4 items-center">
                <Button colorScheme="yellow" isLoading={isLoading} onClick={() => follow(recipe?.user)} >{isFollowing ? "Unfollow" : "Follow"}</Button>
                <Heart className="cursor-pointer" color="red"   fill={isFavorite ? "red" : "none"} onClick={() => addToFavorite(recipe?._id)} />

            </div>
            <p className="text-xl py-4">{recipe?.description}</p>

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
                <img src={recipe?.image} className=" h-full w-full  " alt="recipe_featured_image" />
            </div>
{/* 
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
            </div> */}

            <div className="w-full lg:w-1/3 mt-5">
                <Button
                    leftIcon={<Camera />}
                    size={'lg'}
                    width={'100%'}
                    variant={'solid'}
                    colorScheme="yellow"
                    onClick={() => { navigate("/post") }}
                >I Made This</Button>
            </div>

            <div className="flex flex-col gap-3 justify-center py-4">
                <p className="flex  gap-2"> <Clock />Prep In: {recipe?.prepTime} </p>
                <p className="flex  gap-2"> <Clock />Ready In: {recipe?.cookTime} </p>
                <p className="flex  gap-2"> <Salad /> Ingrediants: {recipe?.ingredients?.length} </p>
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
                    {recipe && recipe?.ingredients?.map((item, idx) => {
                        return <li key={idx} >
                            {item.charAt(0).toUpperCase() + item.substring(1)}
                        </li>
                    })}


                </ol>
            </div>

            <div className="py-2">
                <h1 className="text-xl font-semibold"> Directions</h1>

                <ol className="list-decimal list-inside">
                    {recipe && recipe?.directions?.map((item, idx) => {
                        return <li key={idx} >{item}</li>
                    })}

                </ol>

            </div>

            <div className="flex flex-col gap-3 w-full  py-4">
                <h1 className="text-xl font-semibold">Questions & Replies</h1>

                <div className="w-full  py-2 flex flex-col gap-3">
                    <Input placeholder="ask a question" rounded={'15px'} value={questionData} onChange={(e) => setQuestionData(e.target.value)} />
                    {!user ? <Button colorScheme="yellow" leftIcon={<LogIn />} onClick={() => { navigate("/auth") }} > Sign in to ask a question</Button> :
                        <Button colorScheme="yellow" isLoading={isPosting} leftIcon={<Lightbulb />}
                            onClick={handleAskQuestion}
                        >Ask a question</Button>
                    }
                </div>


                {!isPosting && questions.length > 0 && questions.map((question) => (
                    <Card key={question._id}>
                        <CardHeader className="flex  items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar src="/Men jacket.avif" />
                                <div className="flex flex-col justify-center ">
                                    <Link to={`/profile/${question?.askedBy.userId}`}>{question?.askedBy?.name}</Link>
                                    <p className="text-sm font-light">{formatDate(question?.date)}</p>

                                </div>
                            </div>

                            {user && question?.askedBy.userId === user._id && <IconButton
                                icon={<Trash />}
                                onClick={() => handleDeleteQuestion(question?._id)}
                            >

                            </IconButton>}



                        </CardHeader>

                        <CardBody>
                            <p>{question?.query}</p>
                        </CardBody>

                        <CardFooter className="flex flex-col gap-3">
                            <div className="w-full flex justify-between gap-2">
                                {!showReplyInput[question?._id] && <Button onClick={(e) => { handleToggleReplies(question?._id) }}>
                                    {showReplies[question?._id] ? `Hide ${question?.answers.length} Replies` : `${question?.answers.length > 0 ? `Show ${question?.answers.length} Replies` : 'No Replies'} `}
                                </Button>}
                                {showReplyInput[question._id] &&


                                    <Input placeholder="Type reply.."
                                        onChange={(e) => setReply(e.target.value)}
                                    />


                                }
                                <div className="flex gap-2 items-center ">
                                    <Button onClick={(e) => handleShowReplyInput(question?._id)}>{showReplyInput[question._id] ? "Cancel" : "Reply"}</Button>
                                    {showReplyInput[question?._id] && <div className="flex gap-1 items-center">
                                        <IconButton
                                            isLoading={isPosting}
                                            icon={<SendHorizontalIcon />}
                                            onClick={(e) => { handleSendReply(question?._id) }}
                                        >
                                        </IconButton>


                                    </div>}

                                </div>
                            </div>

                            {showReplies[question._id] &&

                                <div className='w-full   py-3 flex flex-col gap-4'  >
                                    {question?.answers.length > 0 && question?.answers?.map((answer) => (
                                        <div className="w-full border-t-2 py-2 " key={answer?._id}>
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-4 items-center pb-2">
                                                    <Avatar />
                                                    <div className="flex flex-col justify-center">

                                                        <Link to={`/profile/${answer?.answeredBy.userId}`}>{answer?.answeredBy.name}</Link>
                                                        <p className="text-sm font-light">{formatDate(answer?.date)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 items-center justify-center">
                                                    {user && answer?.answeredBy.userId === user._id && <IconButton
                                                        icon={<Trash2 color="red" />}
                                                        onClick={() => handleDeleteReply(question?._id, answer?._id)}
                                                    >

                                                    </IconButton>}
                                                </div>
                                            </div>

                                            <p>{answer?.answer}</p>
                                        </div>
                                    ))}

                                    {question?.answers.length === 0 && (
                                        <div className="w-full border-t-2 py-2 ">
                                            No replies till now!
                                        </div>
                                    )}




                                </div>

                            }




                        </CardFooter>

                    </Card>
                ))}

            </div>
            {/* similar section */}
            <h1 className="text-2xl font-semibold">You'll also love</h1>

            <div className=" w-full grid gap-2 grid-cols-2 grid-rows-3  lg:grid-cols-3 py-5">
                {!isFetching && similar && similar.map((s) => (
                    <Link to={`/recipe/${s._id}`} key={s._id} className="flex flex-col gap-3 lg:w-56 h-44">
                        <div className="w-full">
                            <img src={s.image} alt={s.title} className="w-full" />
                        </div>
                        <div>
                            <p>{s.title}</p>
                        </div>
                    </Link>
                ))}




            </div>

        </div>
    )
}

export default Recipe
