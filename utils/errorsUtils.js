
// time for which the notification stays on screen
export const notification_time = 4000

// time to wait till the next notification can be displayed
// this is used mainly when there are multiple errors from server
export const next_notification_delay = 3000

export const showErrors = (that, errors) => {
  let delay_counter = 0
  for (const error of errors) {
    if (error.code == 'AuthenticationError') {
      localStorage.removeItem('token')
      localStorage.removeItem('isLogin')
      that.$store.dispatch('loginManagement/resetLoginCredentials')
        .then(() => {

          that.$router.push('/')
        })
      return
    }
    setTimeout(() => {
      that.$vs.notify({
        color: 'danger',
        title: 'Error',
        text: error.message.replace(/_/g, ' '),
        time: notification_time,
        position:'top-right'
      }) 
    }, delay_counter * next_notification_delay)
    delay_counter++
  }
}

export const serverError = (that) => {
  that.$vs.notify({
    color: 'danger',
    title: 'Something went wrong',
    text: 'Internal Server Error',
    time: notification_time,
    position:'top-right'
  }) 
}