import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Home,
  LineChart,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LoanApplication {
  id: string;
  created_at: string;
  customer_id: string;
  loan_type: string;
  requested_amount: number;
  status: string;
  approved_amount?: number;
  customer_name?: string;
  email?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<LoanApplication[]>([]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  useEffect(() => {
    const fetchApplications = async () => {
      const { data, error } = await supabase
        .from("loan_applications")
        .select(`
          *,
          customers (
            full_name,
            email
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching applications:", error);
      } else {
        // Transform the data to match our interface
        const transformedData = data?.map(app => ({
          ...app,
          customer_name: app.customers?.full_name || 'Unknown',
          email: app.customers?.email || 'No email'
        })) || [];
        setApplications(transformedData as LoanApplication[]);
      }
    };

    fetchApplications();

    const channel = supabase
      .channel("loan_applications")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "loan_applications" },
        (payload) => {
          console.log("Change received!", payload);
          fetchApplications(); // Refetch all applications on change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const totalRevenue = applications
    .filter((app) => app.status === "approved")
    .reduce((acc, app) => acc + (app.approved_amount || app.requested_amount), 0);

  const newApplications = applications.length;
  const loansDisbursed = applications.filter((app) => app.status === "approved").length;
  const pendingApplications = applications.filter((app) => app.status === "pending").length;

  const chartData = applications
  .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  .map(app => ({
    date: new Date(app.created_at).toLocaleDateString(),
    applications: 1,
  })).reduce((acc, curr) => {
    const date = curr.date;
    if (!acc[date]) {
      acc[date] = { date, applications: 0 };
    }
    acc[date].applications += 1;
    return acc;
  }, {} as Record<string, { date: string; applications: number }>)

  const finalChartData = Object.values(chartData);


  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Scion Financial</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CreditCard className="h-4 w-4" />
                Loan Applications
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Customers
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Scion Financial</span>
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <CreditCard className="h-5 w-5" />
                  Loan Applications
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search applications..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Total revenue from approved loans
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  New Applications
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{newApplications}</div>
                <p className="text-xs text-muted-foreground">
                  Total loan applications received
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Loans Disbursed
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{loansDisbursed}</div>
                <p className="text-xs text-muted-foreground">
                  Total loans approved and disbursed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingApplications}</div>
                <p className="text-xs text-muted-foreground">
                  Applications waiting for approval
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Application Trends</CardTitle>
                <CardDescription>
                  A chart showing the number of loan applications over time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={finalChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="applications" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="xl:col-span-1">
              <CardHeader>
                <CardTitle>Recent Sign-ups</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                <div className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage
                      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                      alt="Avatar"
                    />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      Olivia Martin
                    </p>
                    <p className="text-sm text-muted-foreground">
                      olivia.martin@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+1,999.00</div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      alt="Avatar"
                    />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      Jackson Lee
                    </p>
                    <p className="text-sm text-muted-foreground">
                      jackson.lee@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+39.00</div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Loan Applications</CardTitle>
                <CardDescription>
                  Recent loan applications from your clients.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link to="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden xl:table-cell">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="hidden md:table-cell lg:hidden xl:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div className="font-medium">{app.customer_name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {app.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        {app.loan_type}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <Badge className="text-xs" variant={app.status === 'approved' ? 'outline' : app.status === 'declined' ? 'destructive' : 'secondary'}>
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-cell">
                        {new Date(app.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">${(app.approved_amount || app.requested_amount).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
