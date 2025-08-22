import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">FAQs</h1>
      <Accordion type="single" collapsible className="max-w-2xl">
        <AccordionItem value="1">
          <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
          <AccordionContent>Yes, to select regions. Shipping charges apply.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger>What is your return policy?</AccordionTrigger>
          <AccordionContent>7-day returns on unopened items.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
