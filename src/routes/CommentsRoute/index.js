import {Tweet} from '../../components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTweet, getComments } from "networkCalls"
import {useNotifyUser} from 'contexts'
import {Link} from 'react-router-dom'
import './index.css'
function Comments() {
  const { toast } = useNotifyUser();
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [comments,setComments]=useState(false)
  useEffect(() => {
    (async () => {
      try {
        const tweetResponse = await getTweet(id)   
        setPost(tweetResponse)
      } catch (e) {
       toast.error("Unexpected error. Please try again in some time.")
      }
    })()
  }, [comments])
  

  return (

    <div className='comment-wrapper'><div className='comments-div'>
      <div><button><Link to="/home">Back</Link></button>
        {post && <Tweet post={post} setComments={setComments}/>}
        {post?.comments.length !== 0 && post?.comments.map((comment) => {

          return <div className='comment'>
            <img
              src="https://openui.netlify.app/images/avatar1.png"
              className="avatar avatar-xs"
            // onClick={navigateToProfile}
            />
            <div>
              <h4>Balaji NArayana</h4>
              <h5>replying to <span className='email'>@{comment.commentedBy}</span></h5>
              <p>{comment.comment}</p>
            </div>
          </div>
        })
           }
      </div>
      
    </div></div>
  )
}

export {Comments}