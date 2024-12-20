import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllSkills, getJobTitle } from '@/services/Skills'
import { getCountries, getStates, getCountryCodes } from '@/services/Countries'

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref({})
  const jobTitle = ref({})
  const contriesCode = ref({})
  const countryCode = ref({})
  const states = ref({})
  const getskills = async () => {
    try {
      skills.value = await getAllSkills()
      return skills.value
    } catch (error) {
      console.error('Error fetching skills :', error)
    }
  }
  const getJobTitles = async () => {
    try {
      jobTitle.value = await getJobTitle()
      return jobTitle.value
    } catch (error) {
      console.error('Error fetching job title :', error)
    }
  }
  const getCountriesCode = async () => {
    try {
      contriesCode.value = await getCountries()
      return contriesCode.value
    } catch (error) {
      console.error('Error fetching contries Code :', error)
    }
  }

  const getCountriesWithCodes = async () => {
    try {
      const res = await getCountryCodes();
      countryCode.value = res.data;

      return countryCode.value;
    } catch (error) {
      console.error('Error fetching contries Code :', error)
    }
  }


  const handleGetStates = async (ciso) => {
    try {
      states.value = await getStates(ciso)
      return states.value
    } catch (error) {
      console.error('Error fetching contries Code :', error)
    }
  }
  
const industries = ref([
  { name: 'Advertising and Marketing' },
  { name: 'Technology and IT' },
  { name: 'Design and Creative' },
  { name: 'Media and Entertainment' },
  { name: 'Education and E-Learning' },
  { name: 'Fashion and Lifestyle' },
  { name: 'Finance and Fintech' },
  { name: 'Healthcare and Wellness' },
  { name: 'E-commerce and Retail' },
  { name: 'Consulting and Professional Services' },
  { name: 'Agriculture' }

  // 'Advertising',
  // 'Marketing',
  // 'Public Relations',
  // 'Digital Marketing',
  // 'Performing Arts',
  // 'Visual Arts',
  // 'Entertainment',
  // 'Media Production',
  // 'Graphic Design',
  // 'Web Design',
  // 'UX/UI Design',
  // 'Industrial Design',
  // 'Writing and Content',
  // 'Copywriting',
  // 'Content Creation',
  // 'Editing',
  // 'Journalism',
  // 'Software Development',
  // 'IT Support',
  // 'Data Science',
  // 'Cybersecurity',
  // 'Fashion Design',
  // 'Modeling',
  // 'Beauty and Cosmetics',
  // 'Styling',
  // 'Film and Photography',
  // 'Film Production',
  // 'Photography',
  // 'Video Editing',
  // 'Cinematography',
  // 'Music Production',
  // 'Composition',
  // 'Performance',
  // 'Sound Engineering',
  // 'Fitness',
  // 'Nutrition',
  // 'Wellness Coaching',
  // 'Holistic Health',
  // 'Teaching',
  // 'Training and Development',
  // 'E-Learning',
  // 'Education Administration',
  // 'Culinary Arts',
  // 'Baking and Pastry',
  // 'Culinary Management',
  // 'Food Styling',
  // 'Finance',
  // 'Business Development',
  // 'Project Management',
  // 'Entrepreneurship',
  // 'Game Development',
  // 'Game Design',
  // 'Gaming Content Creation',
  // 'Esports',
  // 'Architecture',
  // 'Construction',
  // 'Urban Planning',
  // 'Interior Design',
  // 'Social Work',
  // 'Counseling',
  // 'Nonprofit Management',
  // 'Community Outreach'
])
  return {
    skills,
    getskills,
    getJobTitles,
    jobTitle,
    getCountriesCode,
    contriesCode,
    handleGetStates,
    states,
    industries,
    getCountriesWithCodes,
    countryCode,
  }
})
