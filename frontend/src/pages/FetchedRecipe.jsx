import { Badge, Box, Button, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr, } from "@chakra-ui/react"
import { BicepsFlexed, Camera, CheckCircle, Clock, Printer, Salad, Share } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useEdamamStore from "../../store/useEdamamStore"
import useRecipeStore from "../../store/useRecipeStore"
import RecipeCard from "../components/RecipeCard"
import Loader from "../components/Loader"

const FetchedRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [similar, setSimilar] = useState(null);



  const navigate = useNavigate();

  const { getRecipeByUri, isLoading: isFetching } = useEdamamStore();
  const { getSimilar, isLoading: isSimilarLoading } = useRecipeStore();
  const { uri } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      setRecipe(await getRecipeByUri(uri))
    }
    fetchRecipe()
  }, [uri])

  useEffect(() => {
    const fetchSimilar = async () => {
      setSimilar(await getSimilar());
    }
    fetchSimilar()
  }, [getSimilar])

  const handlePrint = () => {
    window.print()

  }
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Url copied!")

  }

  if (isFetching || !recipe) return <Loader />





  return (
    <div className="min-h-screen w-full p-5 lg:w-4/5 mx-auto print " >

      <h1 className="text-4xl font-bold py-2">{recipe?.recipe.label}</h1>

      <hr />


      <p className="text-xl py-4">Source: <a className="text-blue-400" target="_blank" href={recipe?.recipe.url}>{recipe?.recipe.source}</a></p>
      <p className="text-xl pb-2">Health Labels</p>
      <Box display={'flex'} gap={4} mt={1} flexWrap={'wrap'}>
        {recipe?.recipe.healthLabels.slice(0, 5).map((item) => (
          <Button disabled size={'sm'} leftIcon={<CheckCircle color="green" />}>{item}</Button>
        ))}
      </Box>

      <p className="text-xl py-2">Dish Type</p>
      <Box display={'flex'} gap={4} mt={1} flexWrap={'wrap'}>

        <Button size={'sm'} leftIcon={<CheckCircle color="green" />}>{recipe.recipe.dishType}</Button>

      </Box>
      <p className="text-xl py-2">Meal Type</p>
      <Box display={'flex'} gap={4} mt={1} flexWrap={'wrap'}>

        <Badge>{recipe.recipe.mealType}</Badge>

      </Box>





      <div className="flex gap-3 py-4">


        <Button
          gap={1}
          onClick={handlePrint}
        >
          <Printer /> Print
        </Button>
        <Button
          gap={1}
          onClick={handleShare}
        >
          <Share /> Share
        </Button>
      </div>

      <div className="lg:w-[800px] lg:h-[530px]">
        <img src={recipe?.recipe.image} className=" h-full w-full  " alt="recipe_featured_image" />
      </div>


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
        <p className="flex  gap-2"> <Clock />Ready In: {recipe?.recipe.totalTime} </p>
        <p className="flex  gap-2"> <Salad /> Ingrediants: {recipe?.recipe.ingredientLines?.length} </p>
      </div>
      <h2 className="flex gap-2 text-md text-yellow-600 font-semibold pb-3"> <BicepsFlexed /> Nutrition information</h2>
      <Box display={'flex'} flexWrap={'wrap'} gap={3} >

        <Badge colorScheme="yellow" textAlign={'center'} rounded={2} p={1} >
          <p>{recipe?.recipe.totalNutrients.CA.label}</p>
          <p>{Math.round(recipe.recipe.totalNutrients.CA.quantity)}{' '}{recipe.recipe.totalNutrients.CA.unit}</p>

        </Badge>

        <Badge colorScheme="yellow" textAlign={'center'}>
          <p>{recipe?.recipe.totalNutrients.ENERC_KCAL.label}</p>
          <p>{Math.round(recipe.recipe.totalNutrients.ENERC_KCAL.quantity)}{' '}{recipe.recipe.totalNutrients.ENERC_KCAL.unit}</p>

        </Badge>
        <Badge colorScheme="yellow" textAlign={'center'}>
          <p>{recipe?.recipe.totalNutrients.FAT.label}</p>
          <p>{Math.round(recipe.recipe.totalNutrients.FAT.quantity)}{' '}{recipe.recipe.totalNutrients.FAT.unit} </p>

        </Badge><Badge colorScheme="yellow" textAlign={'center'}>
          <p>{recipe?.recipe.totalNutrients.SUGAR.label}</p>
          <p>{Math.round(recipe.recipe.totalNutrients.SUGAR.quantity)}{' '}{recipe.recipe.totalNutrients.SUGAR.unit} </p>

        </Badge><Badge colorScheme="yellow" textAlign={'center'}>
          <p>{recipe?.recipe.totalNutrients.FIBTG.label}</p>
          <p>{Math.round(recipe.recipe.totalNutrients.FIBTG.quantity)}{' '}{recipe.recipe.totalNutrients.FIBTG.unit} </p>

        </Badge><Badge colorScheme="yellow" textAlign={'center'}>
          <p>{recipe?.recipe.totalNutrients.PROCNT.label}</p>
          <p>{Math.round(recipe.recipe.totalNutrients.PROCNT.quantity)}{' '}{recipe.recipe.totalNutrients.PROCNT.unit} </p>

        </Badge><Badge colorScheme="yellow" textAlign={'center'}>
          <p>{recipe?.recipe.totalNutrients.NA.label}</p>
          <p>{Math.round(recipe.recipe.totalNutrients.NA.quantity)}{' '}{recipe.recipe.totalNutrients.NA.unit} </p>

        </Badge>


      </Box>
      <h1 className="text-2xl pt-3">Ingredients</h1>
      <Box display={'flex'} my={4} overflow={'hidden'} >
        <TableContainer>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Ingredient</Th>
                <Th isNumeric>Quantity</Th>
                <Th isNumeric>Weight</Th>
                <Th>Category</Th>
              </Tr>
            </Thead>
            <Tbody>
              {recipe?.recipe.ingredients.map((item, index) => (
                <Tr key={index}>
                  <Td><Image rounded={3} src={item.image} /></Td>
                  <Td>{item.food.charAt(0).toLocaleUpperCase() + item.food.slice(1)} </Td>
                  <Td isNumeric>{item.quantity +" "+ item?.measure} </Td>
                  <Td isNumeric>{Math.round(item.weight)}</Td>
                  <Td>{item.foodCategory}</Td>
                </Tr>
              ))}



            </Tbody>

          </Table>
        </TableContainer>
      </Box>



      {/* similar section */}
      <h1 className="text-2xl font-semibold">You'll also love</h1>

      <div className=" w-full grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 py-5">
        {!isSimilarLoading && similar && similar.map((s) => (
          <RecipeCard key={s._id} recipe={s} isLoading={isSimilarLoading} />
        ))}




      </div>

    </div>
  )
}

export default FetchedRecipe
