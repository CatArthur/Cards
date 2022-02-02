import './index.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function DogCard(props) {
  
    return (
      <Card sx={{ maxWidth: props.width }} className='Card'>
        
        <CardMedia
          component="img"
          alt={props.dog.name}
          image={props.dog.image.url}
          className='Image'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.dog.name}
          </Typography>
          <p><b>Height:</b> {props.dog.height.metric} cm</p>
          <p><b>Weight:</b> {props.dog.weight.metric} kg</p>
          <p><b>Lifespan:</b> {props.dog.life_span}</p>
          {props.dog.origin&&
            <p><b>Origin:</b> {props.dog.origin}</p>
          }
          {props.dog.bred_for&&
            <p><b>Breed is for:</b> {props.dog.bred_for}</p>
          }
          <p><b>Temperament:</b> {props.dog.temperament}</p>
          <FavoriteIcon className='FavouriteIcon' fontSize="large" 
            color={props.isLiked?'primary':'action' } onClick={props.setLike}/>
          <DeleteForeverIcon className='DeleteIcon' fontSize="large" onClick={props.deleteCard}/>
        </CardContent>
      </Card>
    );
  }
  
  export default DogCard;