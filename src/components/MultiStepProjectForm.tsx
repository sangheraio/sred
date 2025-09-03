import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, CheckCircle, AlertCircle, FileText, Building, Lightbulb, Scale, Calendar, Eye } from "lucide-react";

const projectSchema = z.object({
  // Step 1: Project Overview
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  category: z.string().min(1, "Category is required"),
  
  // Step 2: Technical Details (SRED Requirements)
  uncertainty: z.string().min(20, "Please describe the scientific or technological uncertainty"),
  hypothesis: z.string().min(20, "Please state your hypothesis clearly"),
  method: z.string().min(30, "Please describe your research method in detail"),
  expectedOutcome: z.string().min(20, "Please describe the expected outcome"),
  
  // Step 3: IP & Ownership
  canadianEntity: z.boolean().refine(val => val === true, "Must be performed by Canadian entity"),
  ipOwnership: z.boolean().refine(val => val === true, "Canadian entity must own resulting IP"),
  companyRevenue: z.string().min(1, "Annual revenue range is required"),
  
  // Step 4: Commercialization Plan
  prototypeRefinement: z.boolean(),
  regulatoryApproval: z.boolean(),
  pilotProjects: z.boolean(),
  ipRegistration: z.boolean(),
  specializedStaff: z.boolean(),
  commercializationDetails: z.string().optional(),
  
  // Step 5: Timeline & Budget
  preApprovalPeriod: z.string().min(1, "Pre-approval period is required"),
  fundingGoal: z.string().min(1, "Funding goal is required"),
  expectedTimeline: z.string().min(1, "Timeline is required"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface MultiStepProjectFormProps {
  onClose: () => void;
}

export const MultiStepProjectForm = ({ onClose }: MultiStepProjectFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      uncertainty: "",
      hypothesis: "",
      method: "",
      expectedOutcome: "",
      canadianEntity: false,
      ipOwnership: false,
      companyRevenue: "",
      prototypeRefinement: false,
      regulatoryApproval: false,
      pilotProjects: false,
      ipRegistration: false,
      specializedStaff: false,
      commercializationDetails: "",
      preApprovalPeriod: "",
      fundingGoal: "",
      expectedTimeline: "",
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    console.log("SRED Application:", data);
    toast({
      title: "Application Submitted!",
      description: "Your SRED pre-approval application has been submitted for government review. You'll receive a Certificate ID within 5-10 business days.",
    });
    onClose();
    form.reset();
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepIcon = (step: number) => {
    const icons = [FileText, Lightbulb, Building, Scale, Calendar, Eye];
    const IconComponent = icons[step - 1];
    return <IconComponent className="w-5 h-5" />;
  };

  const getStepTitle = (step: number) => {
    const titles = [
      "Project Overview",
      "Technical Details", 
      "IP & Ownership",
      "Commercialization",
      "Timeline & Budget",
      "Review & Submit"
    ];
    return titles[step - 1];
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">SRED Pre-Approval Application</h2>
          <Badge variant="outline" className="px-3 py-1">
            Step {currentStep} of {totalSteps}
          </Badge>
        </div>
        <Progress value={progressPercentage} className="h-2 mb-4" />
        
        {/* Step Navigation */}
        <div className="flex justify-between items-center">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div
              key={step}
              className={`flex items-center space-x-2 ${
                step === currentStep ? 'text-primary' : step < currentStep ? 'text-success' : 'text-muted-foreground'
              }`}
            >
              <div className={`p-2 rounded-full ${
                step === currentStep ? 'bg-primary text-primary-foreground' : 
                step < currentStep ? 'bg-success text-success-foreground' : 'bg-muted'
              }`}>
                {step < currentStep ? <CheckCircle className="w-4 h-4" /> : getStepIcon(step)}
              </div>
              <span className="text-sm font-medium hidden sm:block">{getStepTitle(step)}</span>
            </div>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStepIcon(currentStep)}
                {getStepTitle(currentStep)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Step 1: Project Overview */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Revolutionary AI Healthcare Solution" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide a comprehensive overview of your innovation project, its objectives, and potential impact..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Minimum 50 characters. Describe your project in simple, clear language.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Research Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select research category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                            <SelectItem value="biotechnology">Biotechnology</SelectItem>
                            <SelectItem value="clean-energy">Clean Energy</SelectItem>
                            <SelectItem value="quantum-computing">Quantum Computing</SelectItem>
                            <SelectItem value="medical-devices">Medical Devices</SelectItem>
                            <SelectItem value="aerospace">Aerospace</SelectItem>
                            <SelectItem value="robotics">Robotics</SelectItem>
                            <SelectItem value="agtech">Agricultural Technology</SelectItem>
                            <SelectItem value="fintech">Financial Technology</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2: Technical Details (SRED Core Requirements) */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg border border-border">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      SRED Technical Requirements
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Complete these sections using language familiar to scientists and engineers. This forms the core of your SRED pre-approval.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="uncertainty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scientific or Technological Uncertainty</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What specific scientific or technological uncertainty are you trying to resolve? What existing knowledge or technology is insufficient?"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe the gap in scientific or technological knowledge that your project addresses.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hypothesis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hypothesis</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What is your hypothesis for resolving this uncertainty? What do you believe will work and why?"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          State your hypothesis clearly using scientific methodology.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="method"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Research Method</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How will you test your hypothesis? What systematic investigation will you conduct?"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe your systematic approach to testing the hypothesis.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expectedOutcome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expected Outcome</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What advancement in scientific or technological knowledge do you expect to achieve?"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe the expected advancement in knowledge or technology.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: IP & Ownership */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg border border-border">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Building className="w-4 h-4 text-primary" />
                      Canadian Ownership Requirements
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      SRED credits require that the work is performed by Canadian entities and resulting IP remains in Canada.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="canadianEntity"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Research performed by Canadian entity
                          </FormLabel>
                          <FormDescription>
                            Confirm that this R&D work will be performed by a Canadian company or subsidiary.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ipOwnership"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Canadian entity will own resulting IP
                          </FormLabel>
                          <FormDescription>
                            The Canadian entity performing the R&D must own the intellectual property created.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyRevenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Company Revenue</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select revenue range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="under-500k">Under $500K</SelectItem>
                            <SelectItem value="500k-2m">$500K - $2M</SelectItem>
                            <SelectItem value="2m-10m">$2M - $10M</SelectItem>
                            <SelectItem value="10m-50m">$10M - $50M</SelectItem>
                            <SelectItem value="50m-250m">$50M - $250M</SelectItem>
                            <SelectItem value="over-250m">Over $250M</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Companies over $250M revenue have reduced refundable portions.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Commercialization Plan */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-muted/50 p-4 rounded-lg border border-border">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-primary" />
                      Commercialization Expenditures
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Select applicable commercialization activities tied to your experimental project.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="prototypeRefinement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-border rounded-lg">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Prototype Refinement for Production</FormLabel>
                            <FormDescription className="text-xs">
                              Costs to refine prototypes for manufacturing readiness.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="regulatoryApproval"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-border rounded-lg">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Regulatory Approval Costs</FormLabel>
                            <FormDescription className="text-xs">
                              Expenses for regulatory compliance and approvals.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pilotProjects"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-border rounded-lg">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Pilot Projects with Early Customers</FormLabel>
                            <FormDescription className="text-xs">
                              Costs for testing with early adopter customers.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ipRegistration"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-border rounded-lg">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>IP Registration/Protection</FormLabel>
                            <FormDescription className="text-xs">
                              Patent filing and IP protection expenses.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specializedStaff"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-border rounded-lg col-span-full">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Specialized Staff for Scaling</FormLabel>
                            <FormDescription className="text-xs">
                              Personnel costs for scaling initial results into products.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="commercializationDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Commercialization Details (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide additional details about your commercialization strategy and related expenditures..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 5: Timeline & Budget */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="preApprovalPeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pre-Approval Period</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pre-approval duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-year">1 Year</SelectItem>
                            <SelectItem value="2-years">2 Years</SelectItem>
                            <SelectItem value="3-years">3 Years</SelectItem>
                            <SelectItem value="4-years">4 Years</SelectItem>
                            <SelectItem value="5-years">5 Years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How long do you expect this research project to continue?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fundingGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Funding Goal (CAD)</FormLabel>
                        <FormControl>
                          <Input placeholder="500000" {...field} />
                        </FormControl>
                        <FormDescription>
                          Expected total R&D expenditures over the pre-approval period.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expectedTimeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Timeline</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe key milestones and timeline for your research project..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 6: Review & Submit */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="bg-muted/50 p-6 rounded-lg border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      Application Summary
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-muted-foreground">Project:</span>
                          <p className="text-foreground">{form.watch("title") || "Not specified"}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">Category:</span>
                          <p className="text-foreground">{form.watch("category") || "Not specified"}</p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">Pre-approval Period:</span>
                          <p className="text-foreground">{form.watch("preApprovalPeriod") || "Not specified"}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-muted-foreground">Funding Goal:</span>
                          <p className="text-foreground">
                            {form.watch("fundingGoal") ? `$${parseInt(form.watch("fundingGoal")).toLocaleString()} CAD` : "Not specified"}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">IP Ownership:</span>
                          <p className="text-foreground">
                            {form.watch("ipOwnership") ? "✓ Canadian entity" : "Not confirmed"}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-muted-foreground">Revenue Range:</span>
                          <p className="text-foreground">{form.watch("companyRevenue") || "Not specified"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-foreground mb-2">Next Steps</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• CRA will review your application within 5-10 business days</li>
                      <li>• You'll receive a binding Pre-Approval Certificate with a unique ID</li>
                      <li>• Use the Certificate ID when filing Form T661 annually</li>
                      <li>• No technical narratives required for pre-approved projects</li>
                      <li>• Community prediction markets will activate upon approval</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                  >
                    Save Draft
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button type="submit" className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Submit for Approval
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};