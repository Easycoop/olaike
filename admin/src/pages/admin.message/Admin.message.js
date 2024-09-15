import { BiSearch, BiSolidMessage } from 'react-icons/bi';
import './Admin.message.css';
import { PiPlus } from 'react-icons/pi';
import { useContext, useEffect, useRef, useState } from 'react';
import Modal from '../../../user/components/modal/Modal';
import { RiAccountCircleFill } from 'react-icons/ri';
import AuthContext from '../../../context/AuthProvider';
import { axiosPrivate } from '../../../api/axios';
import { AiFillFileImage } from 'react-icons/ai';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { Image, Placeholder, Transformation } from 'cloudinary-react';
import { ScaleLoader } from 'react-spinners';

function AdminMessage() {
  const [content, setContent] = useState(false);
  const [conversation, setNewConversation] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState('');

  const [messages, setMessages] = useState([]);

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('No file selected');

  const [media, setMedia] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [receiverName, setReceiverName] = useState('');

  const { auth, isDark } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);

  const closeModal = () => {
    setNewConversation(false);
  };

  useEffect(() => {
    getConversations();
  }, []);

  const getConversations = async () => {
    try {
      const response = await axiosPrivate.post(
        `api/v1/conversations/conversations`,
        JSON.stringify({
          senderId: auth.user.id,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      const res = response.data.data;
      setConversations(res);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await axiosPrivate.post(
        `api/v1/message/send`,
        JSON.stringify({
          senderName: auth.user.full_name,
          senderId: auth.user.id,
          receiverId: receiverId,
          message: message,
          media: image,
          mediaType: mediaType,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      const res = response.data.data;
      setMessage('');
      setImage(null);
      setFileName('');
      getConversations();
      getMessages(receiverId);
    } catch (error) {
      console.log(error);
    }
  };

  const createConversation = async () => {
    try {
      const response = await axiosPrivate.post(
        `api/v1/conversations/create-conversation`,
        JSON.stringify({
          senderName: auth.user.full_name,
          senderId: auth.user.id,
          receiverId: receiverId,
          message: message,
          media: image,
          mediaType: mediaType,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      const res = response.data.data;
      getConversations();
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async (receiver_id) => {
    try {
      const response = await axiosPrivate.post(
        `api/v1/message/get-messages`,
        JSON.stringify({
          senderId: auth.user.id,
          receiverId: receiver_id,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      const res = response.data.data;
      setMessages(res);
    } catch (error) {
      console.log(error);
    }
  };

  const messageContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [matchingUsers, setMatchingUsers] = useState([]);

  // Function to fetch matching users
  const fetchMatchingUsers = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/v1/user/search-user-messasge?search=${searchQuery}`,
      ); // Assuming your API endpoint for user search is /api/users
      setMatchingUsers(response.data.users); // Assuming your API response returns an array of users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchMatchingUsers();
    } else {
      setMatchingUsers([]); // Clear matching users when search query is empty
    }
  }, [searchQuery]);

  const [isLoading, setIsLoading] = useState(false);

  const cssDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: isDark ? '#fff' : '#000',
    background: isDark ? '#121212' : '#000',
  };
  return (
    <>
      {isLoading ? (
        <div style={cssDiv}>
          <ScaleLoader color={isDark ? '#fff' : '#000'} />
        </div>
      ) : (
        <div className="admin__message">
          <section className="admin__message__section__one">
            <div className="admin__message__section__one__search">
              <input placeholder="Type to search contact" />
              <BiSearch className="admin__message__section__one__search__icon" />
            </div>
            <div className="admin__message__section__one__end">
              <button
                onClick={() => {
                  setNewConversation(true);
                }}
              >
                <PiPlus className="admin__message__section__one__end__icon" /> New conversation
              </button>
            </div>
          </section>
          <section className="admin__message__section__two">
            <div
              className={
                content
                  ? 'admin__message__section__two__head mobile'
                  : 'admin__message__section__two__head'
              }
            >
              {conversations.map((item, i) => {
                return (
                  <div
                    className="admin__message__section__two__head__entry"
                    onClick={() => {
                      setContent(true);
                      setReceiverName(conversations[i].receiver_name);
                      setReceiverId(conversations[i].receiver_id);
                      getMessages(conversations[i].receiver_id);
                    }}
                  >
                    <RiAccountCircleFill className="review__user__icon" />
                    <div>
                      <h3>
                        {conversations[i].receiver_name} <span>{conversations[i].createdAt}</span>
                      </h3>
                      <p>{conversations[i].last_message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className={
                content
                  ? 'admin__message__section__two__content mobile'
                  : 'admin__message__section__two__content'
              }
            >
              {!content ? (
                <div className="admin__message__section__two__content__default">
                  <BiSolidMessage className="admin__message__section__two__content__default__icon" />
                  <p>- Select a conversation to send a message -</p>
                </div>
              ) : (
                <div className="admin__message__section__two__content__selected">
                  <article className="admin__message__section__two__content__selected__header">
                    <h3>{receiverName}</h3>
                  </article>
                  <article
                    className="admin__message__section__two__content__selected__content"
                    ref={messageContainerRef}
                  >
                    {messages.map((item, i) => {
                      if (messages[i].sender_id == auth.user.id) {
                        return (
                          <article className="admin__message__section__two__content__selected__sender">
                            <div className="admin__message__section__two__head__entry">
                              <div>
                                <h3>
                                  {messages[i].sender_name} <span>{messages[i].createdAt}</span>
                                </h3>
                                <p>{messages[i].message}</p>

                                {messages[i].media ? (
                                  <Image
                                    quality="auto:best"
                                    loading="lazy"
                                    cloudName="du1dvxjo8"
                                    publicId={messages[i].media}
                                    width="300"
                                    crop="scale"
                                  >
                                    <Placeholder type="blur"></Placeholder>
                                  </Image>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </article>
                        );
                      } else {
                        return (
                          <article className="admin__message__section__two__content__selected__receiver">
                            <div className="admin__message__section__two__head__entry">
                              {/* {<BsPerson className="admin__message__section__two__head__entry__icon" />} */}
                              <div>
                                <h3>
                                  {messages[i].sender_name} <span>{messages[i].createdAt}</span>
                                </h3>
                                <p>{messages[i].message}</p>
                                {messages[i].media ? (
                                  <Image
                                    quality="auto:best"
                                    loading="lazy"
                                    cloudName="du1dvxjo8"
                                    publicId={messages[i].media}
                                    width="300"
                                    crop="scale"
                                  >
                                    <Placeholder type="blur"></Placeholder>
                                  </Image>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </article>
                        );
                      }
                    })}
                  </article>

                  <div className="admin__message__section__two__content__selected__compose">
                    <textarea
                      type="text"
                      placeholder="Enter new message"
                      name="text"
                      rows="6"
                      cols="4"
                      wrap="soft"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                    <form
                      className="admin__message__image__upload"
                      onClick={() => document.querySelector('.input__field').click()}
                    >
                      <input
                        type="file"
                        className="input__field"
                        hidden
                        onChange={({ target: { files } }) => {
                          files[0] && setFileName(files[0].name);
                          if (files) {
                            const reader = new FileReader();
                            reader.readAsDataURL(files[0]);
                            reader.onloadend = () => {
                              setImage(reader.result);
                            };
                          }
                        }}
                      />

                      {image ? (
                        <img src={image} width={75} height={75} alt={fileName} />
                      ) : (
                        <MdCloudUpload color="#1475cf" size={50} />
                      )}
                    </form>
                    <div className="image__upload__label">
                      <AiFillFileImage color="#1475" />
                      <span>
                        {fileName}
                        <MdDelete
                          onClick={() => {
                            setFileName('No file selected');
                            setImage(null);
                          }}
                        />
                      </span>
                    </div>

                    <button onClick={sendMessage}>Send</button>
                  </div>
                </div>
              )}
              {}
            </div>
          </section>

          {/* Create conversation modal */}
          <Modal isOpen={conversation} onClose={closeModal}>
            <div className="">
              <div className="admin__message__conversation">
                <section className="admin__message__conversation__section__one">
                  <h1>New conversation</h1>
                </section>
                <section className="admin__message__conversation__section__two">
                  <h1>Choose users</h1>
                  <input
                    type="text"
                    placeholder="Search for users"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {selectedReceiver !== '' && (
                    <div className="admin__message__conversation__section__two__search__selected_receiver">
                      {selectedReceiver}
                    </div>
                  )}

                  {matchingUsers.length > 0 && (
                    <ul className="admin__message__conversation__section__two__search__result">
                      {matchingUsers.map((user) => (
                        <li
                          key={user.id}
                          onClick={() => {
                            setReceiverId(user.id);
                            setSelectedReceiver(user.first_name);
                            setSearchQuery('');
                            setMatchingUsers([]);
                          }}
                        >
                          {user.first_name + ' ' + user.last_name}
                        </li>
                      ))}
                    </ul>
                  )}
                  <h1>Message</h1>
                  <textarea
                    type="text"
                    name="text"
                    rows="8"
                    cols="6"
                    wrap="soft"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <h1>Add file</h1>
                  <form
                    className="image__upload"
                    onClick={() => document.querySelector('.input__field').click()}
                  >
                    <input
                      type="file"
                      className="input__field"
                      hidden
                      onChange={({ target: { files } }) => {
                        files[0] && setFileName(files[0].name);
                        if (files) {
                          const reader = new FileReader();
                          reader.readAsDataURL(files[0]);
                          reader.onloadend = () => {
                            setImage(reader.result);
                          };
                        }
                      }}
                    />

                    {image ? (
                      <img src={image} width={75} height={75} alt={fileName} />
                    ) : (
                      <MdCloudUpload color="#1475cf" size={50} />
                    )}
                  </form>
                  <div className="image__upload__label">
                    <AiFillFileImage color="#1475" />
                    <span>
                      {fileName}
                      <MdDelete
                        onClick={() => {
                          setFileName('No file selected');
                          setImage(null);
                        }}
                      />
                    </span>
                  </div>
                </section>
                <section className="admin__message__conversation__section__three">
                  <div>
                    <button onClick={closeModal}>Cancel</button>
                    <button
                      onClick={() => {
                        closeModal();
                        createConversation();
                      }}
                    >
                      Send
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}

export default AdminMessage;
