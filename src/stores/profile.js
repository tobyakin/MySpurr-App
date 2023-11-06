import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getUserProfile,
  updateProfilePhoto,
  updateBio,
  updateOverview,
  addWorkDetails,
  addSkills,
  addEducation
} from '@/services/Profile'

export const useUserProfile = defineStore('profile', () => {
  const user = ref({})

  const profileImage = ref('')

  const bioInfo = ref({
    first_name: "",
    last_name: "",
    skill_title: "",
    rate: "",
    location: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    behance: "",
    facebook: ""
})
const overview = ref('')
  const employment_details = ref({
    company_name: '',
    title: '',
    employment_type: '',
    start_date: '',
    end_date: '',
    description: '',
    currently_working_here: 'no',
  })
    const top_skills = ref([])
    const education = ref({
      school_name: '',
      degree: '',
      start_date: '',
      end_date: '',
      description: '',
      currently_schooling_here: 'no'
    })


  const userProfile = async () => {
    try {
    user.value = await getUserProfile()
      return user.value;
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }
    const handleUpdateProfilePhoto = async () => {
            let payload = {
              image: profileImage.value
            }
      updateProfilePhoto(payload)
    }
    const handleUpdateBio = async () => {
      let payload = {
        first_name: bioInfo.value.first_name,
        last_name: bioInfo.value.last_name,
        skill_title: bioInfo.value.skill_title,
        rate: bioInfo.value.rate,
        location: bioInfo.value.location,
        linkedin: bioInfo.value.linkedin,
        instagram: bioInfo.value.instagram,
        twitter: bioInfo.value.twitter,
        behance: bioInfo.value.behance,
        facebook: bioInfo.value.facebook
      }
      updateBio(payload)
    }
    const handleUpdateOverview = async () => {
      let payload = {
        overview: overview.value
      }
      updateOverview(payload)
    }
    const handleAddWorkDetails = async () => {
      let payload = {
        employment_details: {
          company_name: employment_details.value.company_name,
          title: employment_details.value.title,
          employment_type: employment_details.value.employment_type,
          description: employment_details.value.description,
          start_date: employment_details.value.start_date,
          end_date: employment_details.value.end_date,
          currently_working_here: employment_details.value.currently_working_here
        }
      }
      addWorkDetails(payload)
    }
    const handleAddSkills = async () => {
      let payload = {
        top_skills: top_skills.value
      }
      addSkills(payload)
    }
    const handleAddEducation = async () => {
      let payload = {
        education: {
          school_name: education.value.school_name,
          degree: education.value.degree,
          description: education.value.description,
          start_date: education.value.start_date,
          end_date: education.value.end_date,
          currently_schooling_here: education.value.currently_schooling_here,
        }
      }
      addEducation(payload)
    }

  return {
    user,
    userProfile,
    handleUpdateProfilePhoto,
    handleUpdateBio,
    handleUpdateOverview,
    handleAddWorkDetails,
    handleAddSkills,
    handleAddEducation,
    profileImage,
    bioInfo,
    overview,
    employment_details,
    top_skills,
    education
  }
})
