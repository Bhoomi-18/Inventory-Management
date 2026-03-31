import { Shield, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../lib/apiClient";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SecuritySection = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/auth/me");
        setProfile({ name: response.data.name, email: response.data.email });
      } catch (err: any) {
        setStatus("Unable to load user data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleProfileSave = async () => {
    try {
      const response = await api.put("/auth/me", {
        name: profile.name,
      });
      setStatus(response.data.message || "Profile updated successfully.");
    } catch (err: any) {
      setStatus(err.response?.data?.message || "Failed to update profile.");
    }
  };

  const passwordChecks = {
    length: newPassword.length >= 8,
    lower: /[a-z]/.test(newPassword),
    upper: /[A-Z]/.test(newPassword),
    digit: /[0-9]/.test(newPassword),
    symbol: /[^A-Za-z0-9]/.test(newPassword),
    confirm: newPassword === confirmPassword && confirmPassword.length > 0,
  };

  const handlePasswordSave = async () => {
    if (!passwordChecks.length || !passwordChecks.lower || !passwordChecks.upper || !passwordChecks.digit || !passwordChecks.symbol || !passwordChecks.confirm) {
      setStatus("Password does not meet requirements or passwords do not match.");
      return;
    }

    try {
      const response = await api.put("/auth/me/password", {
        currentPassword,
        newPassword,
      });
      setStatus(response.data.message || "Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setStatus(err.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <div className="p-4 border border-border rounded-lg bg-card text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-5 h-5 text-foreground" />
        <h2 className="text-lg font-semibold">Security</h2>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading profile...</p>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Name</label>
            <Input
              className="h-10"
              value={profile.name}
              onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <Input
              className="h-10"
              value={profile.email}
              disabled
              title="Email cannot be changed as it is used as your primary identifier"
            />
            <p className="text-xs text-muted-foreground">Email cannot be changed as it is your primary identifier</p>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleProfileSave} className="cursor-pointer" variant="secondary" size="sm">
              Save Profile
            </Button>
          </div>

          <div className="h-px bg-border" />

          <div className="space-y-2">
            <label className="block text-sm font-medium">Current Password</label>
            <Input
              className="h-10"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">New Password</label>
            <Input
              className="h-10"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Confirm New Password</label>
            <Input
              className="h-10"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="text-xs space-y-1 text-muted-foreground">
            {[
              { checked: passwordChecks.length, label: "Minimum 8 characters" },
              { checked: passwordChecks.lower, label: "Lowercase letter" },
              { checked: passwordChecks.upper, label: "Uppercase letter" },
              { checked: passwordChecks.digit, label: "Digit" },
              { checked: passwordChecks.symbol, label: "Symbol" },
              { checked: passwordChecks.confirm, label: "Confirmation matches" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1">
                {item.checked ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span className={item.checked ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-300'}>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button onClick={handlePasswordSave} className="cursor-pointer" variant="default" size="sm">
              Update Password
            </Button>
          </div>

          {status && <p className="text-sm text-muted-foreground">{status}</p>}
        </div>
      )}
    </div>
  );
};

export default SecuritySection;
