import Hero from "../components/hero"
import Section from "../components/section"
import ImageSection from "../components/imagesection"

function Dashboard(){
return(
    <div className="font-sans">
        <Hero />
        <main className="max-w-5xl mx-auto px-4">
            <Section 
            title="Title" 
            text="Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." 
            />
            <ImageSection />
            <Section 
            title="Title" 
            text="Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story." 
            />
        </main>
    </div>
)
}
export default Dashboard