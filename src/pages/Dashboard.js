import Hero from "../components/hero"
import Section from "../components/section"
import ImageSection from "../components/imagesection"

function Dashboard(){
return(
    <div className="font-sans">
        <Hero />
        <main className="max-w-5xl mx-auto px-4">
            <Section 
            title="Real-Time Soil Monitoring" 
            text="Monitor your soil health with precision. Our advanced sensor technology tracks pH levels, moisture content, nutrient composition, and temperature in real-time. Get instant insights into nitrogen, phosphorus, and potassium levels to optimize fertilizer application and maximize crop yield." 
            />
            <ImageSection />
            <Section 
            title="AI-Powered Fertilizer Recommendations" 
            text="Stop guessing about fertilizer needs. Our intelligent system analyzes sensor data and provides tailored fertilizer recommendations based on your soil's specific nutrient deficiencies. Receive actionable insights for DAP, Urea, MOP, and other fertilizers to ensure your crops get exactly what they need, when they need it." 
            />
        </main>
    </div>
)
}
export default Dashboard