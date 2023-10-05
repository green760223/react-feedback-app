import { createContext, useState, useEffect } from "react"

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedback
  const fetchFeedback = async () => {
    try {
      const response = await fetch(
        `https://feedback-json-data-server.onrender.com/feedback?_sort=id&_order=desc`
      )

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText)
      }
      const data = await response.json()
      setFeedback(data)
    } catch (error) {
      console.error("Fetch error: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Update feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(
      `https://feedback-json-data-server.onrender.com/feedback/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updItem),
      }
    )

    const data = await response.json()

    setFeedback(
      setFeedback(feedback.map((item) => (item.id === id ? data : item)))
    )

    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(
        `https://feedback-json-data-server.onrender.com/feedback/${id}`,
        { method: "DELETE" }
      )

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch(
      "https://feedback-json-data-server.onrender.com/feedback",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFeedback),
      }
    )

    const data = await response.json()

    setFeedback([data, ...feedback])
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}>
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
